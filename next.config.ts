import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Azure Static Web Apps' Next.js hybrid rendering support builds from
  // the standalone output.
  output: "standalone",
};

export default nextConfig;
