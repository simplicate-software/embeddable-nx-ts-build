import { defineConfig } from "@embeddable.com/sdk-core";
import react from "@embeddable.com/sdk-react";

export default defineConfig({
  plugins: [react],
  componentsSrc: "src/components",

  region: "EU",

  audienceUrl: process.env.EMBEDDABLE_AUDIENCE_URL,
  authClientId: process.env.EMBEDDABLE_AUTH_CLIENT_ID,
  authDomain: process.env.EMBEDDABLE_AUTH_DOMAIN,
  previewBaseUrl: process.env.EMBEDDABLE_PREVIEW_BASE_URL,
  pushBaseUrl: process.env.EMBEDDABLE_PUSH_BASE_URL,
});
