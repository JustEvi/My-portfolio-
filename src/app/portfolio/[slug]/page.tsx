import type { Metadata } from "next";
import PageLayout from "@/components/layout";
import PortfolioDetailPage from "@/components/pages/portfolio-detail";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const supabase = await createClient();
	const { data: project } = await supabase
		.from('projects')
		.select('name, short_description, cover_image_url')
		.eq('slug', params.slug)
		.single();

	if (!project) return { title: "Project Not Found" };

	return {
		title: project.name,
		description: project.short_description,
		openGraph: {
			title: project.name,
			description: project.short_description,
			images: project.cover_image_url ? [{ url: project.cover_image_url }] : [],
		},
	};
}

export default function SinglePortfolio({ params }: { params: { slug: string } }) {
  // Normally the slug would be passed to the component to fetch data.
  // We're mocking data within the component for Phase 2.
  return (
    <PageLayout>
      <PortfolioDetailPage slug={params.slug} />
    </PageLayout>
  );
}
