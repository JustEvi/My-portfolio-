import type { Metadata } from "next";
import ContactPage from "@/components/pages/contact";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get in touch for intentional brand identity design and creative collaborations.",
};

export default async function Contact() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('email, social_links').single();
  const email = data?.email || 'hello@evieadebayo.com';
  const socialLinks = data?.social_links || [];

  return (
    <ContactPage email={email} socialLinks={socialLinks} />
  );
}
