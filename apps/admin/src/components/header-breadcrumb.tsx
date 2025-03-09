"use client";

import * as React from "react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { type MenuItem, navMain } from "@/components/app-sidebar";
import { useLocation } from "@tanstack/react-router";

function getBreadcrumbs(pathname: string, items: MenuItem[]) {
	const parentPath = pathname.split("/").slice(0, 3).join("/");
	const currentItem = items.find((item) => item.url === parentPath);

	if (!currentItem) return null;

	if (currentItem === navMain[0]) {
		return [{ title: currentItem.title, href: currentItem.url }];
	}

	const breadcrumbs = [navMain[0], currentItem].map((item) => ({
		title: item.title,
		href: item.url,
	}));

	if (currentItem.children?.pattern.test(pathname)) {
		breadcrumbs.push({
			title: currentItem.children.getTitle(pathname),
			href: pathname,
		});
	}

	return breadcrumbs;
}

export function HeaderBreadcrumb() {
	const location = useLocation();

	const pathname = location.pathname;
	const breadcrumbs = getBreadcrumbs(pathname, navMain);

	if (!breadcrumbs) return null;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((crumb, index) => (
					<React.Fragment key={crumb.href}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{crumb.href ? (
								<BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{crumb.title}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}
