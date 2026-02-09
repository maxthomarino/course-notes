/**
 * Access policy stub for future authentication integration.
 * When NextAuth is added, this module will check user sessions and permissions.
 */

export interface AccessContext {
  /** The user's session (null if unauthenticated). */
  user: { id: string; email: string } | null;
  /** The resource being accessed. */
  resource: { type: "course" | "lecture" | "pdf"; courseSlug?: string };
}

/**
 * Check if the current access context permits the requested resource.
 * Currently allows all access. Replace with real auth logic when NextAuth is added.
 */
export function checkAccess(_context: AccessContext): {
  allowed: boolean;
  reason?: string;
} {
  // Future: check session, role, course enrollment, etc.
  return { allowed: true };
}
