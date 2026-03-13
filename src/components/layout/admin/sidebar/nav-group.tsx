"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";

interface NavGroupProps {
	title: string;
	items: {
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
	}[];
}

// Sidebar menu button styles extracted for use with CollapsibleTrigger
const sidebarMenuButtonStyles =
	"ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground gap-2 rounded-md p-2 text-left text-sm transition-[width,height,padding] group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! focus-visible:ring-2 peer/menu-button flex w-full items-center overflow-hidden outline-hidden group/menu-button h-8 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0";

export const NavGroup = ({ title, items }: NavGroupProps) => {
	const { isMobile, setOpenMobile } = useSidebar();
	const router = useRouter();

	// Handle navigation and close sidebar on mobile
	const handleNavigation = (url: string) => {
		if (isMobile) {
			setOpenMobile(false);
		}
		router.push(url);
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>{title}</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{items.map((item) =>
						item.items && item.items.length > 0 ? (
							<Collapsible
								key={item.title}
								defaultOpen={item.isActive}
								className="group/collapsible"
							>
								<SidebarMenuItem>
									{/* 
                    For collapsible items, we use CollapsibleTrigger directly
                    styled to match SidebarMenuButton, since SidebarMenuButton's
                    tooltip prop overrides the render prop in Base UI.
                  */}
									<CollapsibleTrigger
										className={cn(
											sidebarMenuButtonStyles,
											item.isActive &&
												"bg-primary text-primary-foreground",
										)}
									>
										{item.icon && <item.icon />}
										<span>{item.title}</span>
										
										<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</CollapsibleTrigger>
									<CollapsibleContent>
										<SidebarMenuSub className="py-2.5">
											{item.items.map((subItem) => (
												<SidebarMenuSubItem
													key={subItem.title}
												>
													<SidebarMenuSubButton
														render={(props: React.HTMLAttributes<HTMLElement>) => (
															<Link
																href={
																	subItem.url
																}
																{...props}
																onClick={() => {
																	if (
																		isMobile
																	) {
																		setOpenMobile(
																			false,
																		);
																	}
																}}
															/>
														)}
														className={
															subItem.isActive
																? "bg-primary/10 text-primary"
																: ""
														}
													>
														<span>
															{subItem.title}
														</span>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											))}
										</SidebarMenuSub>
									</CollapsibleContent>
								</SidebarMenuItem>
							</Collapsible>
						) : (
							<SidebarMenuItem key={item.title}>
								{/* 
                  For non-collapsible items, we can't use both render and tooltip.
                  We'll use onClick with router.push instead, and only show tooltip
                  when sidebar is collapsed (handled by SidebarMenuButton internally).
                */}
								<SidebarMenuButton
									tooltip={item.title}
									onClick={() => handleNavigation(item.url)}
									className={cn(
										`cursor-pointer ${item.isActive && "bg-primary text-primary-foreground"}`,
									)}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						),
					)}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
