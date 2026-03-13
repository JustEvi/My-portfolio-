"use client";
import { usePathname } from "next/navigation";

import Header from "./header";
import Footer from "./footer";
import PageBody from "./body";

const PrimaryLayout = ({ children }: { children: React.ReactNode }) => {
	// if home page make it fixed
	const pathname = usePathname();
	const isHome = pathname === "/";
	const sticky = !isHome;
	return (
		<>
			<Header sticky={sticky} />
			<PageBody>{children}</PageBody>
			<Footer />
		</>
	);
};

export default PrimaryLayout;
