export default function PageBody({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex-1 flex flex-col w-full min-h-[calc(100vh-64px)] relative z-10">
			{children}
		</main>
	);
}
