import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { showRoutes } from "hono/dev";
import { requestId } from "hono/request-id";
import { auth } from "./lib/auth";
import userRoute from "./modules/user";
import type { AppType } from "./type";

const app = new Hono<AppType>().basePath("/api");

app.use("*", requestId());
app.use("/api/*", cors());
app.use(prettyJSON());
app.use(logger());

app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:2111", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);
app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.route("/user", userRoute);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});
showRoutes(app);
serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
