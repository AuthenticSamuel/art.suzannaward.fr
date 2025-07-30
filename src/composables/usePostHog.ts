import posthog from "posthog-js";

export const usePostHog = () => {
  posthog.init(import.meta.env.VITE_POSTHOG_TOKEN, {
    api_host: import.meta.env.VITE_POSTHOG_API_HOST,
    ui_host: "https://eu.posthog.com",
    defaults: "2025-05-24",
    person_profiles: "identified_only",
  });

  return { posthog };
};
