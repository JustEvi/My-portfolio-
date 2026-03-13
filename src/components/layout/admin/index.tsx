"use client";

import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "./sidebar";
import { AdminHeader } from "./header";
// import { AdminLayoutSkeleton } from "./AdminLayoutSkeleton";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const router = useRouter();

	// Render the actual layout once folio data is loaded and validated
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AdminSidebar variant="inset" />
			<SidebarInset>
				<div className="min-h-screen">
					<AdminHeader />
					<div className="px-4 lg:px-8 py-4 lg:py-6">{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
