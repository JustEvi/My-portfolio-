import type { Metadata } from "next";
import PortfolioPage from "@/components/pages/portfolio";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "Explore my collection of intentional brand identities and design projects.",
};

export default function Portfolio() {
  return (
    <PortfolioPage />
  );
}
