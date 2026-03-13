import type { Metadata } from "next";
import Home from "@/components/pages/home";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
	const supabase = await createClient();
	const { data: content } = await supabase
		.from('page_content')
		.select('*')
		.eq('page_slug', 'home');

	const contentMap: Record<string, string> = {};
	const imageMap: Record<string, string> = {};
	content?.forEach(item => {
		if (item.content) contentMap[item.section_name] = item.content;
		if (item.image_url) imageMap[item.section_name] = item.image_url;
	});

	const mainText = contentMap['hero_main_text'] || "Shaping Brands Through";
	const subText = contentMap['hero_sub_text'] || "Intentional Design";
	const description = contentMap['hero_description'] || "Creative Director & Designer";
	const imageUrl = imageMap['hero_image'];

	return {
		title: `${mainText} ${subText}`,
		description,
		openGraph: {
			images: imageUrl ? [{ url: imageUrl }] : [],
		},
		alternates: { canonical: "/" },
	};
}

const HomePage = () => {

	return (
		<>
			<Home />
		</>
	);
};

export default HomePage;
