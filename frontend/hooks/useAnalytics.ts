import { useCallback } from "react";

// In-memory event log for MVP (can swap to GA/PostHog)
const eventLog: any[] = [];

export default function useAnalytics() {
  const track = useCallback((event: string, data: Record<string, any> = {}) => {
    eventLog.push({ event, data, ts: Date.now() });
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log(`[Analytics]`, event, data);
    }
    // TODO: Integrate with GA/PostHog if desired
  }, []);
  return { track, eventLog };
}
