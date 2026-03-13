"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { SiteSettings } from "@/types";
import Image from "next/image";

const NavContent = ({ settings }: { settings: SiteSettings | null }) => {
	const pathname = usePathname();

	const navItems = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Portfolio", href: "/portfolio" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<header className="transition-all duration-300 py-6 bg-transparent">
			<div className="w-site flex items-center justify-between">
				<Link 
					href="/" 
					className="font-serif text-2xl font-normal tracking-wide text-foreground hover:opacity-80 transition-opacity flex items-center gap-2"
				>
					{settings?.logo_url ? (
						<div className="relative w-8 h-8 md:w-10 md:h-10 rounded overflow-hidden">
							<Image src={settings.logo_url} alt="Logo" fill className="object-cover" />
						</div>
					) : (
						<>{settings?.display_name || "Evie"}</>
					)}
				</Link>
				
				<nav className="hidden md:flex items-center gap-10 list-none">
					{navItems.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"font-sans text-[0.8rem] font-normal tracking-widest uppercase transition-colors duration-200 relative py-1",
									"after:absolute after:-bottom-[3px] after:left-0 after:right-0 after:h-px after:bg-primary-deep after:origin-left after:transition-transform after:duration-300",
									isActive 
										? "text-primary-deep after:scale-x-100" 
										: "text-secondary-light hover:text-primary-deep after:scale-x-0 hover:after:scale-x-100"
								)}
							>
								{item.name}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
};

export default NavContent;
