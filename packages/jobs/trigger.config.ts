import type { TriggerConfig } from "@trigger.dev/sdk/v3";

export const config: TriggerConfig = {
  // Replace <your-project-ref> with your project id: https://trigger.dev/docs/trigger-config
  project: "proj_nkmpdkyurjnkbujjdqtb",
  logLevel: "log",
  maxDuration: 10, // 10 seconds
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
};
