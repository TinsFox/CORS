import { z } from "zod";

import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
config({ path: "./.env" });

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		BETTER_AUTH_SECRET: z.string(),
		// BETTER_AUTH_URL: z.string(),
		BETTER_AUTH_EMAIL: z.string(),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
		// BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
		BETTER_AUTH_EMAIL: process.env.BETTER_AUTH_EMAIL,
	},
});
