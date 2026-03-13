import ScrollReveal from "@/components/ui/custom/scroll-reveal";
import PageSection from "@/components/ui/custom/page-section";

const Features = () => {
	return (
		<PageSection
			id="features"
			padding={"sm"}
			alignment="center"
			title={
				<>
					Built for <em>real</em> conversations
				</>
			}
			subtitle="Every feature designed to make honesty feel effortless and safe."
		>
			<div className="grid grid-cols-12 gap-4 md:gap-5">
				{/* Real-time chat — large card */}
				<ScrollReveal className="col-span-12 md:col-span-7">
					<div className="bg-card border border-border rounded-2xl p-8 md:p-10 h-full">
						<h3 className="font-serif text-2xl mb-2">
							Real-time conversations
						</h3>
						<p className="text-muted-foreground text-[15px] mb-6">
							Back-and-forth messaging as it happens. No refresh
							needed.
						</p>
						<div className="space-y-3">
							<div className="flex justify-start">
								<div className="bg-surface-2 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[75%]">
									<p className="text-sm">
										Honestly? Your designs have gotten so
										much better this year.
									</p>
								</div>
							</div>
							<div className="flex justify-end">
								<div className="bg-warm text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[75%]">
									<p className="text-sm">
										Wow, that means a lot. Any specific ones
										you liked?
									</p>
								</div>
							</div>
							<div className="flex justify-start">
								<div className="bg-surface-2 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[75%]">
									<p className="text-sm">
										The portfolio redesign — absolute
										chef&apos;s kiss.
									</p>
								</div>
							</div>
						</div>
					</div>
				</ScrollReveal>

				{/* 24h Timer */}
				<ScrollReveal className="col-span-12 md:col-span-5" delay={100}>
					<div className="bg-card border border-border rounded-2xl p-8 md:p-10 h-full">
						<h3 className="font-serif text-2xl mb-2">
							24-hour sessions
						</h3>
						<p className="text-muted-foreground text-[15px] mb-8">
							Every session has a life. A live countdown keeps it
							urgent and exciting.
						</p>
						<div className="text-center">
							<div className="inline-flex items-center gap-1 text-4xl md:text-5xl font-mono font-light text-foreground tracking-wider">
								<span className="bg-surface-2 rounded-xl px-3 py-2">
									18
								</span>
								<span className="text-muted-foreground">:</span>
								<span className="bg-surface-2 rounded-xl px-3 py-2">
									42
								</span>
								<span className="text-muted-foreground">:</span>
								<span className="bg-surface-2 rounded-xl px-3 py-2">
									07
								</span>
							</div>
							<p className="text-text-3 text-xs mt-3 uppercase tracking-wider">
								remaining
							</p>
						</div>
					</div>
				</ScrollReveal>

				{/* True anonymity */}
				<ScrollReveal className="col-span-12 md:col-span-4" delay={200}>
					<div className="bg-card border border-border rounded-2xl p-8 h-full">
						<h3 className="font-serif text-xl mb-2">
							True anonymity
						</h3>
						<p className="text-muted-foreground text-[15px] mb-5">
							No accounts, no tracking. Just emoji identities.
						</p>
						<div className="space-y-2">
							{[
								{ emoji: "🦊", code: "#4821" },
								{ emoji: "🐨", code: "#7733" },
								{ emoji: "🦋", code: "#2019" },
							].map((id, i) => (
								<div
									key={i}
									className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2.5"
								>
									<span className="text-lg">{id.emoji}</span>
									<span className="text-sm font-medium text-muted-foreground">
										Anon {id.code}
									</span>
								</div>
							))}
						</div>
					</div>
				</ScrollReveal>

				{/* Multiple sessions */}
				<ScrollReveal className="col-span-12 md:col-span-4" delay={300}>
					<div className="bg-card border border-border rounded-2xl p-8 h-full">
						<h3 className="font-serif text-xl mb-2">
							Multiple sessions
						</h3>
						<p className="text-muted-foreground text-[15px] mb-5">
							Run different prompts for different audiences
							simultaneously.
						</p>
						<div className="space-y-2">
							{[
								"Feedback on my portfolio",
								"Hot takes only",
								"AMA — ask me anything",
							].map((s, i) => (
								<div
									key={i}
									className="bg-surface-2 rounded-xl px-4 py-2.5"
								>
									<p className="text-sm font-medium truncate">
										{s}
									</p>
								</div>
							))}
						</div>
					</div>
				</ScrollReveal>

				{/* Share anywhere */}
				<ScrollReveal className="col-span-12 md:col-span-4" delay={400}>
					<div className="bg-card border border-border rounded-2xl p-8 h-full">
						<h3 className="font-serif text-xl mb-2">
							Share anywhere
						</h3>
						<p className="text-muted-foreground text-[15px] mb-5">
							One link. Works on every platform and device.
						</p>
						<div className="bg-surface-2 rounded-xl px-4 py-3 flex items-center gap-3">
							<span className="text-sm text-muted-foreground truncate flex-1">
								wiespr.com/s/your-session
							</span>
							<button className="text-warm text-sm font-semibold shrink-0">
								Copy
							</button>
						</div>
					</div>
				</ScrollReveal>
			</div>
		</PageSection>
	);
};

export default Features;
