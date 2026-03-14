import type { Metadata } from "next";
import PortfolioDetailPage from "@/components/pages/portfolio-detail";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const { slug } = await params;
	const supabase = await createClient();
	const { data: project } = await supabase
		.from('projects')
		.select('name, short_description, cover_image_url')
		.eq('slug', slug)
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

export default async function SinglePortfolio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <PortfolioDetailPage slug={slug} />
  );
}
