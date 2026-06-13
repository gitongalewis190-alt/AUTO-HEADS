import { analytics } from "@/lib/firebase/client";
import { logEvent } from "firebase/analytics";

export async function trackEvent(name: string, params?: Record<string, unknown>) {
  const analyticsInstance = await analytics;
  if (analyticsInstance) {
    logEvent(analyticsInstance, name, params);
  }
}
