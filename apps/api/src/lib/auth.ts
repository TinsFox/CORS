import { db } from "@/db";
import { env } from "@/env.js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username } from "better-auth/plugins";
import * as authSchema from "../../auth-schema";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/rest-password";
const from = env.BETTER_AUTH_EMAIL;

export const auth = betterAuth({
	plugins: [username(), admin()],
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: authSchema,
		usePlural: true,
	}),
});
