import PrimaryLayout from "./primary";

export default function PageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <PrimaryLayout>{children}</PrimaryLayout>;
}
