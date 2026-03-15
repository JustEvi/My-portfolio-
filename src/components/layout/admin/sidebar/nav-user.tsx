"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MoreVertical, ChevronUp, LogOut, User as UserIcon, Lock } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

export function NavUser() {
	const { isMobile } = useSidebar();
	const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        fetchUser();
    }, []);

	if (!user) {
		return null;
	}

	const displayName = user.email ? user.email.split("@")[0] : 'Admin';

	const getInitials = () => {
		return displayName.substring(0, 2).toUpperCase();
	};

	const handleLogout = async () => {
		try {
            const supabase = createClient();
			await supabase.auth.signOut();
			toast.success("Logged out successfully");
			router.push("/admin/login");
		} catch (error) {
			toast.error("Failed to logout. Please try again.");
		}
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={(triggerProps: React.HTMLAttributes<HTMLElement>) => (
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								{...triggerProps}
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarFallback className="rounded-lg bg-primary-deep text-primary-blush">
										{getInitials()}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-1 flex-col gap-0.5 text-left text-sm leading-tight">
									<span className="truncate font-semibold text-foreground">
										{displayName}
									</span>
									<span className="truncate text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
								<MoreVertical className="ml-auto size-4 text-muted-foreground" />
							</SidebarMenuButton>
						)}
					/>

					<DropdownMenuContent
						className="min-w-56 rounded-lg border-border"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarFallback className="rounded-lg bg-primary-deep text-primary-blush">
											{getInitials()}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-1 flex-col gap-0.5 text-left text-sm leading-tight">
										<span className="truncate font-semibold text-foreground">
											{displayName}
										</span>
										<span className="truncate text-xs text-muted-foreground">
											{user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>

						<DropdownMenuSeparator className="bg-border" />

						<DropdownMenuGroup>
							<DropdownMenuItem
                                render={(props: React.HTMLAttributes<HTMLElement>) => (
                                    <Link
                                        href="/admin/settings"
                                        className="cursor-pointer hover:bg-muted flex w-full items-center"
                                        {...props}
                                    >
                                        <UserIcon className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                )}
                            />
						</DropdownMenuGroup>

						<DropdownMenuSeparator className="bg-border" />

						<DropdownMenuItem
							className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
							onClick={handleLogout}
						>
							<LogOut className="mr-2 h-4 w-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
