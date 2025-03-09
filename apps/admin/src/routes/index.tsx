import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
			<ul>
				<li className="text-orange-300">
					<Link to="/dashboard">Dashboard</Link>
				</li>
				<li>
					<Link to="/sign-in">login</Link>
				</li>
			</ul>
		</div>
	);
}
