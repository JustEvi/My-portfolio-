import type { Metadata } from "next";
import PageLayout from "@/components/layout";
import ContactPage from "@/components/pages/contact";

export const metadata: Metadata = {
	title: "Contact",
	description: "Get in touch for intentional brand identity design and creative collaborations.",
};

export default function Contact() {
  return (
    <PageLayout>
      <ContactPage />
    </PageLayout>
  );
}
