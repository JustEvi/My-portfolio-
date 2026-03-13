"use client";

import Image from "next/image";
import {
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

export function AdminName({ name, tagline }: { name: string; tagline?: string }) {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className="flex items-center gap-4 rounded-md py-4 pl-2">
					{isCollapsed ? (
						<div className="flex items-center justify-center w-full h-full">
							<span className="font-serif text-2xl font-bold text-foreground">
                                E
                            </span>
						</div>
					) : (
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-serif text-3xl text-foreground">
								{name} <span className="text-secondary-muted italic">{tagline}</span>
							</span>
						</div>
					)}
				</div>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
