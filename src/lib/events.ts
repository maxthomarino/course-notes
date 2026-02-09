/**
 * Event emitter stubs for future extensibility.
 * These can later be wired to services like Resend for email notifications.
 */

export interface LectureEvent {
  courseSlug: string;
  fileName: string;
  title: string;
  timestamp: Date;
}

type EventHandler = (event: LectureEvent) => void | Promise<void>;

const handlers: Record<string, EventHandler[]> = {};

export function on(eventName: string, handler: EventHandler): void {
  if (!handlers[eventName]) {
    handlers[eventName] = [];
  }
  handlers[eventName].push(handler);
}

export async function emit(
  eventName: string,
  event: LectureEvent
): Promise<void> {
  const eventHandlers = handlers[eventName] ?? [];
  for (const handler of eventHandlers) {
    try {
      await handler(event);
    } catch (error) {
      console.error(`Event handler error for "${eventName}":`, error);
    }
  }
}

/**
 * Placeholder: call this when a new lecture PDF is discovered.
 * Future: wire to Resend email notifications.
 */
export async function onNewLectureDiscovered(
  courseSlug: string,
  fileName: string,
  title: string
): Promise<void> {
  await emit("newLectureDiscovered", {
    courseSlug,
    fileName,
    title,
    timestamp: new Date(),
  });
}
