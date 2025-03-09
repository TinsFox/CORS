import { Link, createFileRoute } from "@tanstack/react-router";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

import { useState } from "react";

export const Route = createFileRoute("/forget-password")({
	component: ForgetPassword,
});

function ForgetPassword() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError("");

		try {
			const { data, error } = await authClient.forgetPassword({
				email,
				redirectTo: "/reset-password",
			});
			console.log("data, error: ", data, error);
			if (error) {
				throw new Error(error.message);
			}
			setIsSubmitted(true);
		} catch (err) {
			console.log(err);
			setError("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isSubmitted) {
		return (
			<main className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-[#0A0A0A]">
				<Card className="w-[400px] border-0 bg-white/80 dark:bg-black/50 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.1)]">
					<CardHeader className="space-y-3">
						<CardTitle className="text-2xl font-normal text-neutral-900 dark:text-neutral-100">
							Check your email
						</CardTitle>
						<CardDescription className="text-base text-neutral-600 dark:text-neutral-400">
							We have sent a password reset link to your email.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Alert className="border-0 bg-blue-50/30 dark:bg-blue-500/10">
							<CheckCircle2 className="h-4 w-4 text-blue-500" />
							<AlertDescription className="text-neutral-700 dark:text-neutral-300">
								If you don't see the email, check your spam folder.
							</AlertDescription>
						</Alert>
					</CardContent>
					<CardFooter>
						<Button
							variant="outline"
							className="w-full border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900"
							onClick={() => setIsSubmitted(false)}
						>
							<ArrowLeft className="mr-2 h-4 w-4" /> Back to reset password
						</Button>
					</CardFooter>
				</Card>
			</main>
		);
	}

	return (
		<main className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-[#0A0A0A]">
			<Card className="w-[400px] border-0 bg-white/80 dark:bg-black/50 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] dark:shadow-[0_0_1px_1px_rgba(255,255,255,0.1)]">
				<CardHeader className="space-y-3">
					<CardTitle className="text-2xl font-normal text-neutral-900 dark:text-neutral-100">
						Reset password
					</CardTitle>
					<CardDescription className="text-base text-neutral-600 dark:text-neutral-400">
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label
								htmlFor="email"
								className="text-sm text-neutral-700 dark:text-neutral-300"
							>
								Email
							</Label>
							<Input
								id="email"
								type="email"
								placeholder="name@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="h-10 border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500"
							/>
						</div>
						{error && (
							<Alert
								variant="destructive"
								className="border-0 bg-red-50/30 dark:bg-red-500/10"
							>
								<AlertCircle className="h-4 w-4" />
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}
						<Button
							className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-10 transition-colors"
							type="submit"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Sending..." : "Continue"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link to="/sign-in">
						<Button
							variant="link"
							className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
						>
							Back to sign in
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</main>
	);
}
