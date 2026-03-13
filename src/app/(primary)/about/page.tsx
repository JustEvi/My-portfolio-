import type { Metadata } from "next";
import AboutPage from "@/components/pages/about";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
	const supabase = await createClient();
	const { data: settings } = await supabase.from('site_settings').select('display_name').single();
	const { data: content } = await supabase
		.from('page_content')
		.select('*')
		.eq('page_slug', 'about');

	const contentMap: Record<string, string> = {};
	const imageMap: Record<string, string> = {};
	content?.forEach(item => {
		if (item.content) contentMap[item.section_name] = item.content;
		if (item.image_url) imageMap[item.section_name] = item.image_url;
	});

	const siteName = settings?.display_name || "Evie Portfolio";
	const bioText = contentMap['about_bio_text'] || "About Evie Olowu";
	const imageUrl = imageMap['about_image'];

	return {
		title: `About`,
		description: bioText.substring(0, 160),
		openGraph: {
			images: imageUrl ? [{ url: imageUrl }] : [],
		},
	};
}

export default function About() {
  return (
    <AboutPage />
  );
}
