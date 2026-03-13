import NavContent from "./content";
import NavWrapper from "./sticky";

export default function Header({ sticky }: { sticky?: boolean }) {
	return (
		<NavWrapper sticky={sticky}>
			<NavContent />
		</NavWrapper>
	);
}