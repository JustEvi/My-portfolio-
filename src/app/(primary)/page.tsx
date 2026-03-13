import type { Metadata } from "next";
import Home from "@/components/pages/home";

export const metadata: Metadata = {
	title: "",
	description:
		"",
	alternates: { canonical: "/" },
};

const HomePage = () => {

	return (
		<>
			<Home />
		</>
	);
};

export default HomePage;
