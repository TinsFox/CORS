import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: ["./src/db/schema.ts", "./auth-schema.ts"],
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
