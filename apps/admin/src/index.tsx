import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useSession } from "./lib/auth-client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		auth: undefined,
	},
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
function InnerApp() {
	const auth = useSession();
	console.log("InnerApp auth: ", auth);
	return <RouterProvider router={router} context={{ auth: auth.data }} />;
}

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<InnerApp />
		</React.StrictMode>,
	);
}
