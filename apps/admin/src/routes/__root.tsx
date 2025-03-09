import type { Session } from "@/lib/auth-client";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

interface RouterContext {
	auth?: Session | null;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
		</>
	);
}
