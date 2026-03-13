import PrimaryLayout from "@/components/layout/primary";
import { createClient } from "@/lib/supabase/server";

export default async function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();
	const { data: settings } = await supabase.from('site_settings').select('*').single();

	return <PrimaryLayout settings={settings}>{children}</PrimaryLayout>;
}
