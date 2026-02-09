# Lecture Notes Portal

A minimal, clean lecture-note portal built with Next.js, TypeScript, and Tailwind CSS. PDFs are served from Cloudflare R2 with automatic Vercel-hosted fallback.

## Architecture

```
src/
├── app/                          # Next.js App Router pages & API routes
│   ├── page.tsx                  # Landing page (course listing)
│   ├── courses/[courseSlug]/     # Course page (lecture listing)
│   │   └── lectures/[fileName]/ # PDF viewer page
│   └── api/
│       ├── courses/             # GET /api/courses
│       │   └── [courseSlug]/lectures/  # GET /api/courses/:slug/lectures
│       └── pdf/[courseSlug]/[fileName]/ # GET /api/pdf/:slug/:file
├── components/                  # UI components
├── content/courses/             # Course registry (config-driven)
├── lib/                         # Data layer
│   ├── r2.ts                    # Cloudflare R2 S3 client
│   ├── lectures.ts              # Lecture discovery (R2 + local merge)
│   ├── filename-parser.ts       # Derive titles/labels from filenames
│   ├── access-policy.ts         # Auth stub (future NextAuth)
│   └── events.ts                # Event emitter stubs (future Resend)
├── middleware.ts                 # Auth-ready middleware hook
└── __tests__/                   # Jest tests
```

## Local Development

```bash
cd lecture-site
npm install
cp .env.local.example .env.local   # Edit with your R2 credentials
npm run dev                         # http://localhost:3000
```

The site works **without R2 credentials** — it falls back to PDFs in `/public/pdfs/`.

## Environment Variables

| Variable              | Required | Description                          |
|-----------------------|----------|--------------------------------------|
| `R2_ENDPOINT`         | No*      | R2 S3-compatible endpoint URL        |
| `R2_BUCKET`           | No*      | R2 bucket name (default: `lecture-site`) |
| `R2_ACCESS_KEY_ID`    | No*      | R2 API token access key ID           |
| `R2_SECRET_ACCESS_KEY`| No*      | R2 API token secret access key       |

*Required for R2 primary storage. Without these, only local fallback PDFs are served.

## How Dynamic Discovery Works

1. **No manual metadata edits needed.** The system discovers PDFs automatically.
2. On each request to `/api/courses/:slug/lectures`:
   - Lists objects in R2 under the course prefix (e.g., `software-system-design/`)
   - Lists local PDFs under `/public/pdfs/software-system-design/`
   - Merges results by filename (R2 preferred, local fills gaps)
3. Display metadata is derived from the filename:
   - Course code prefixes are stripped (e.g., `CS2SD_`)
   - `Lec1`, `Week_02`, etc. become labels
   - Underscores/hyphens become spaces for the title

## R2 Upload Instructions

Upload PDFs to R2 with keys matching `<courseSlug>/<fileName>.pdf`:

```bash
# Using rclone (configure R2 remote first)
rclone copy ./my-pdfs/ r2:lecture-site/software-system-design/

# Using AWS CLI with R2 endpoint
aws s3 cp my-lecture.pdf s3://lecture-site/software-system-design/my-lecture.pdf \
  --endpoint-url https://2e00dc3c8a01fd128cab48545ed1342c.r2.cloudflarestorage.com
```

### R2 CORS Configuration

In the Cloudflare R2 dashboard, add a CORS rule for your domain:

```json
[
  {
    "AllowedOrigins": ["https://your-domain.vercel.app", "http://localhost:3000"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["Range"],
    "ExposeHeaders": ["Content-Range", "Accept-Ranges", "Content-Length"],
    "MaxAgeSeconds": 86400
  }
]
```

## Adding a New Course

1. Add an entry to `src/content/courses/index.ts`
2. Create the local fallback directory: `public/pdfs/<new-slug>/`
3. Upload PDFs to R2 under the same prefix: `<new-slug>/`

## PDF Serving Strategy

All PDF links go through `/api/pdf/<courseSlug>/<fileName>`:

1. Tries R2 `GetObject` first (with Range support for in-browser viewing)
2. Falls back to local file from `/public/pdfs/` if R2 fails or object is missing
3. Returns 404 with a clean message if both sources miss

Supports `Range` headers (HTTP 206) for efficient in-browser PDF rendering.

## Vercel Deployment

1. Push the repo to GitHub
2. Import in Vercel
3. Set environment variables (`R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`)
4. Deploy — the site works immediately with local fallback PDFs

## Tests

```bash
npm test
```

- **filename-parser.test.ts** — title/label extraction from various filename patterns
- **lectures.test.ts** — R2 + local merge logic, deduplication, sorting, fallback behavior
- **pdf-api.test.ts** — PDF route handler: headers, Range support, 404, path traversal rejection
