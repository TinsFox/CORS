import {
	FileText,
	FolderKanban,
	Home,
	ListTree,
	type LucideIcon,
	Send,
	Settings2,
} from "lucide-react";

import type * as React from "react";

import { AppInfo } from "@/components/app-info";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import { useLocation } from "@tanstack/react-router";
import { NavSecondary } from "./nav-secondary";

export interface MenuItem {
	title: string;
	url: string;
	icon: LucideIcon;
	items: { title: string; url: string }[];
	children?: {
		pattern: RegExp;
		getTitle: (pathname: string) => string;
	};
}
// Convert existing navigation config to new format
export const navMain = [
	{
		title: "首页",
		url: "/dashboard",
		icon: Home,
		items: [],
	},
	{
		title: "文章",
		url: "/dashboard/posts",
		icon: FileText,
		items: [],
		children: {
			pattern: /^\/dashboard\/posts\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建文章" : "编辑文章";
			},
		},
	},
	{
		title: "项目",
		url: "/dashboard/projects",
		icon: FolderKanban,
		items: [],
		children: {
			pattern: /^\/dashboard\/projects\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建项目" : "编辑项目";
			},
		},
	},
	{
		title: "分类",
		url: "/dashboard/categories",
		icon: ListTree,
		items: [],
		children: {
			pattern: /^\/dashboard\/categories\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建分类" : "编辑分类";
			},
		},
	},
	{
		title: "设置",
		url: "/dashboard/settings",
		icon: Settings2,
		items: [],
	},
	{
		title: "站点信息",
		url: "/dashboard/site-info",
		icon: Settings2,
		items: [
			{
				title: "站点信息",
				url: "/dashboard/site-info",
				icon: Settings2,
			},
		],
	},
];
const navSecondary = [
	{
		title: "Feedback",
		url: "https://github.com/TinsFox/shadcnui-boilerplate/issues",
		icon: Send,
		external: true,
	},
	{
		title: "网站链接",
		url: "env.NEXT_PUBLIC_URL",
		external: true,
	},
	{
		title: "RSS",
		url: `/feed`,
		external: true,
	},
	{
		title: "Sitemap",
		url: `/sitemap`,
		external: true,
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();

	const pathname = location.pathname;

	// Update isActive status based on current pathname
	const items = navMain.map((item) => ({
		...item,
		isActive: pathname === item.url,
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<AppInfo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={items} />
				<NavSecondary items={navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
