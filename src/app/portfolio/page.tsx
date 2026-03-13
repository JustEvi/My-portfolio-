import type { Metadata } from "next";
import PageLayout from "@/components/layout";
import PortfolioPage from "@/components/pages/portfolio";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "Explore my collection of intentional brand identities and design projects.",
};

export default function Portfolio() {
  return (
    <PageLayout>
      <PortfolioPage />
    </PageLayout>
  );
}
