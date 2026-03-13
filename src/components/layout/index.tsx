import PrimaryLayout from "./primary";
import { createClient } from "@/lib/supabase/server";

export default async function PageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = await createClient();
	const { data } = await supabase.from('site_settings').select('*').single();
	
	return <PrimaryLayout settings={data}>{children}</PrimaryLayout>;
}
