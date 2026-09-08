import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import path from "node:path";

// Populate process.env from local .env file during development
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
        const [key, ...valParts] = trimmed.split("=");
        const k = key.trim();
        const v = valParts.join("=").trim();
        if (k) {
          process.env[k] = v;
        }
      }
    }
  }
} catch {
  // Ignore error
}

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart(),
    react(),
  ],
});
