import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import ScrollReveal from "@/components/ui/custom/scroll-reveal";

const sectionVariants = cva("w-full", {
	variants: {
		padding: {
			sm: "py-12 lg:py-16",
			md: "py-16 lg:py-24",
			lg: "py-24 lg:py-32",
			none: "py-0",
		},
		background: {
			default: "bg-background",
			muted: "bg-muted/30",
			primary: "bg-primary/5",
			secondary: "bg-secondary",
			gradient: "bg-gradient-to-b from-muted/50 to-background",
		},
	},
	defaultVariants: {
		padding: "md",
		background: "default",
	},
});

const headerVariants = cva("mb-12 lg:mb-16", {
	variants: {
		alignment: {
			left: "text-left",
			center: "text-center mx-auto",
			right: "text-right ml-auto",
			row: "grid md:grid-cols-2 gap-6 md:gap-12 mb-16 md:mb-20 max-w-full!",
		},
	},
	defaultVariants: {
		alignment: "center",
	},
});

export interface PageSectionProps extends VariantProps<typeof sectionVariants> {
	title?: React.ReactNode | string;
	subtitle?: React.ReactNode | string;
	alignment?: "left" | "center" | "right" | "row";
	className?: string;
	headerClassName?: string;
	contentClassName?: string;
	children: React.ReactNode;
	id?: string;
}

const PageSection = ({
	title,
	subtitle,
	alignment = "center",
	padding,
	background,
	className,
	headerClassName,
	contentClassName,
	children,
	id,
}: PageSectionProps) => {
	return (
		<section
			id={id}
			className={cn(sectionVariants({ padding, background }), className)}
		>
			<div className="w-site">
				{title || subtitle ? (
					<ScrollReveal>
						<div
							className={cn(
								headerVariants({ alignment }),
								"max-w-3xl",
								headerClassName,
							)}
						>
							{title && (
								<h2 className="text-3xl md:text-5xl font-serif leading-tight mb-4">
									{title}
								</h2>
							)}
							{subtitle && (
								<p className="text-muted-foreground text-base md:text-lg leading-relaxed self-end max-w-xl mx-auto">
									{subtitle}
								</p>
							)}
						</div>
					</ScrollReveal>
				) : (
					<></>
				)}
				<div className={contentClassName}>{children}</div>
			</div>
		</section>
	);
};

export default PageSection;
