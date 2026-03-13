import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { createClient } from "@/lib/supabase/server";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').single();
  
  const siteName = settings?.display_name || "Evie Portfolio";
  const fullName = settings?.full_name || "Evie Adebayo";
  const bio = settings?.bio || "Creative Director & Designer";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: bio,
    authors: [{ name: fullName }],
    creator: fullName,
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteName,
      title: siteName,
      description: bio,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: bio,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang="en" className={cn("font-sans", inter.variable)}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TooltipProvider>{children}</TooltipProvider>
			</body>
		</html>
  );
}
