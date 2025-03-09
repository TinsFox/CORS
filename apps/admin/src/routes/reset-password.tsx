import { createFileRoute, useRouter } from "@tanstack/react-router";
("use client");

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const resetPasswordSchema = z
	.object({
		password: z.string().min(8, "Password must be at least 8 characters"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export const Route = createFileRoute("/reset-password")({
	component: ResetPassword,
});

function ResetPassword() {
	const router = useRouter();

	const navigate = Route.useNavigate();
	const form = useForm<ResetPasswordForm>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(data: ResetPasswordForm) {
		try {
			await authClient.resetPassword({
				newPassword: data.password,
			});
			toast.success("Password reset successfully");
			router.invalidate().finally(() => {
				navigate({ to: "/sign-in" });
			});
		} catch (error) {
			console.error(error);
			toast.error("Failed to reset password. Please try again.");
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center px-4 bg-background/95">
			<div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/95 to-background" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

			<Card className="w-full max-w-[400px] relative border-none bg-background/60 shadow-lg">
				<CardHeader className="space-y-3 pb-6">
					<CardTitle className="text-2xl font-semibold tracking-tight">
						Reset password
					</CardTitle>
					<CardDescription className="text-muted-foreground/80">
						Enter your new password to continue
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="text-sm font-medium">
											New password
										</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
												placeholder="Enter your new password"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem className="space-y-2">
										<FormLabel className="text-sm font-medium">
											Confirm password
										</FormLabel>
										<FormControl>
											<PasswordInput
												{...field}
												className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
												placeholder="Confirm your new password"
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full h-11 text-primary-foreground font-medium transition-colors"
								disabled={form.formState.isSubmitting}
							>
								{form.formState.isSubmitting ? (
									<Loader2 size={16} className="animate-spin" />
								) : (
									"Reset password"
								)}
							</Button>

							<div className="text-center pt-2">
								<p className="text-sm text-muted-foreground/80">
									Remember your password?{" "}
									<a
										href="/sign-in"
										className="text-primary hover:text-primary/80 transition-colors font-medium"
									>
										Sign in
									</a>
								</p>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
