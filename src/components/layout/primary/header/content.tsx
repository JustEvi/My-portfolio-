"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const NavContent = () => {
	const [showMenu, setShowMenu] = useState(false);


	// Close menu when clicking outside
	useEffect(() => {
		if (!showMenu) return;
		const close = () => setShowMenu(false);
		document.addEventListener("click", close);
		return () => document.removeEventListener("click", close);
	}, [showMenu]);

	return (
		<header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full transition-all duration-300">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold tracking-tight text-primary">
						EVIE
					</span>
				</div>
				<nav className="hidden md:flex items-center gap-8 text-sm font-medium">
					<a
						href="/"
						className="hover:text-primary transition-colors"
					>
						Home
					</a>
					<a
						href="/projects"
						className="hover:text-primary transition-colors"
					>
						Projects
					</a>
					<a
						href="/about"
						className="hover:text-primary transition-colors"
					>
						About
					</a>
					<a
						href="/contact"
						className="hover:text-primary transition-colors"
					>
						Contact
					</a>
				</nav>
				<div className="flex items-center gap-4">
					<button className="px-4 py-2 bg-primary text-primary-foreground rounded-sm text-sm font-medium hover:bg-primary-deep transition-colors">
						Get Started
					</button>
				</div>
			</div>
		</header>
	);
};

export default NavContent;
