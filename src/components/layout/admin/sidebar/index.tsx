"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import {
	LayoutDashboard,
	FolderKanban,
	ChartBar, 
    Settings,
	LogOut,
	LucideIcon,
} from "lucide-react";

import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { AdminName } from "./admin-name";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";


interface NavItem {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	comingSoon?: boolean;
	items?: {
		title: string;
		url: string;
		isActive?: boolean;
	}[];
}

interface NavData {
	navMain: NavItem[];
	navContents?: NavItem[];
	navUtils?: NavItem[];
}



const data: NavData = {
	navMain: [
		{
			title: "Dashboard",
			url: "/admin",
			icon: LayoutDashboard,
		},
		{
			title: "Projects",
			url: "/admin/projects",
			icon: FolderKanban,
		},
		{
			title: "Categories",
			url: "/admin/categories",
			icon: ChartBar,
		},
	],
	navUtils: [
		{
			title: "Static Pages",
			url: "/admin/pages",
			icon: ChartBar,
		},
		{
			title: "Settings",
			url: "/admin/settings",
			icon: Settings,
		},
	],
};

export function AdminSidebar({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	// Function to check if a navigation item should be active
	const isActive = (url: string, subItems?: { url: string }[]) => {
		// Check if current path matches the main URL
		if (pathname === url) return true;

		// Check if current path matches any sub-item URL
		if (subItems) {
			return subItems.some((subItem) => pathname === subItem.url);
		}

		// Check if current path starts with the URL (for nested routes)
		// Specifically exclude '/admin' and '/' from this loose matching
		if (url !== "/admin" && url !== "/" && pathname.startsWith(url)) return true;

		return false;
	};

	// Show all navigation items for authenticated users
	const getNavItems = () => {
		// Platform items
		const navMainWithActive = data.navMain.map((item) => ({
			...item,
			isActive: isActive(item.url),
		}));

		// Content items
		const navContentsWithActive = data.navContents?.map((item) => ({
			...item,
			isActive: isActive(item.url, item.items),
			items: item.items?.map((subItem) => ({
				...subItem,
				isActive: pathname === subItem.url,
			})),
		}));

		// Utils items
		const navUtilsWithActive = data.navUtils?.map((item) => ({
			...item,
			isActive: isActive(item.url),
		}));

		return {
			navMain: navMainWithActive,
			navContents: navContentsWithActive,
			navUtils: navUtilsWithActive,
		};
	};

	const { navMain, navContents, navUtils } = getNavItems();

	return (
		<Sidebar collapsible="icon" {...props} className="border-r border-border bg-card font-sans">
			<SidebarHeader>
				<AdminName
					name={"Evie"}
					tagline={"Admin"}
				/>
			</SidebarHeader>
			<SidebarContent>
				{navMain.length > 0 && (
					<NavGroup title="Platform" items={navMain} />
				)}
				{navContents && navContents.length > 0 && (
					<NavGroup title="Contents" items={navContents} />
				)}
				{navUtils && navUtils.length > 0 && (
					<NavGroup title="Utils" items={navUtils} />
				)}
			</SidebarContent>
			<SidebarFooter><NavUser /></SidebarFooter>
		</Sidebar>
	);
}

export function AdminSidebarSkeleton({
	...props
}: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" collapsible="icon" {...props}>
			<SidebarHeader>
				{/* Admin Switcher Skeleton */}
				<Skeleton className="h-12 w-full mb-8" />
			</SidebarHeader>

			<SidebarContent>
				{/* Navigation Groups */}
				<SidebarGroup>
					<SidebarGroupContent>
						{/* Main Navigation */}
						<SidebarMenu>
							{[1, 2, 3, 4].map((i) => (
								<SidebarMenuItem key={i}>
									<div className="flex items-center mb-4">
										<Skeleton className="h-8 w-full" />
										{/* Label */}
									</div>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				{/* User Section */}
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex items-center gap-3">
							<Skeleton className="h-8 w-8 rounded-full" />
							{/* Avatar */}
							<div className="space-y-1">
								<Skeleton className="h-3 w-20" />
								{/* Name */}
								<Skeleton className="h-3 w-16" />
								{/* Email */}
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
