import { useSession } from "@/lib/auth-client";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const auth = useSession();
	console.log("auth", auth.data?.user);
	return (
		<section className="grid gap-2 p-2">
			<p>Hi {JSON.stringify(auth.data?.user)}!</p>
			<p>You are currently on the dashboard route.</p>
		</section>
	);
}
