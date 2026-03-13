import PrimaryLayout from "@/components/layout/primary";

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <PrimaryLayout>{children}</PrimaryLayout>;
}
