import PageLayout from "@/components/layout";
import PortfolioDetailPage from "@/components/pages/portfolio-detail";

export default function SinglePortfolio({ params }: { params: { slug: string } }) {
  // Normally the slug would be passed to the component to fetch data.
  // We're mocking data within the component for Phase 2.
  return (
    <PageLayout>
      <PortfolioDetailPage slug={params.slug} />
    </PageLayout>
  );
}
