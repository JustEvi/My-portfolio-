"use client";
import { usePathname } from "next/navigation";

import Header from "./header";
import Footer from "./footer";
import PageBody from "./body";
import { SiteSettings } from "@/types";

const PrimaryLayout = ({ children, settings }: { children: React.ReactNode, settings: SiteSettings | null }) => {
	// if home page make it fixed
	const pathname = usePathname();
	const isHome = pathname === "/";
	const sticky = !isHome;
	return (
		<>
			<Header sticky={sticky} settings={settings} />
			<PageBody>{children}</PageBody>
			<Footer settings={settings} />
		</>
	);
};

export default PrimaryLayout;
