"use client";
import { useEffect, useState } from "react";

const NavWrapper = ({
	children,
	sticky = true,
}: {
	children: React.ReactNode;
	sticky?: boolean;
}) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={`${sticky ? "sticky-nav" : "fixed-nav"} ${isScrolled ? "scrolled" : ""}`}
		>
			{children}
		</div>
	);
};

export default NavWrapper;
