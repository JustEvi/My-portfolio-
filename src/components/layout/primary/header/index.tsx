import NavContent from "./content";
import NavWrapper from "./sticky";
import { SiteSettings } from "@/types";

export default function Header({ sticky, settings }: { sticky?: boolean, settings: SiteSettings | null }) {
	return (
		<NavWrapper sticky={sticky}>
			<NavContent settings={settings} />
		</NavWrapper>
	);
}
