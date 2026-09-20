import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

const privacySections: LegalSection[] = [
  {
    heading: "who this is",
    paragraphs: [
      "This Privacy Policy explains how litenby collects, uses, and protects information submitted through this website. By using this site, you agree to the practices described here.",
    ],
  },
  {
    heading: "what we collect",
    paragraphs: [
      "The only personal information we collect is what you choose to submit through our contact form: your first name, last name, email address, and the content of your message.",
      "We do not collect payment information, create user accounts, or gather personal data through any other part of the site.",
    ],
  },
  {
    heading: "how we use it",
    paragraphs: [
      "We use the information you submit solely to respond to your inquiry. We do not use it for marketing, sell it, or share it with third parties, except as described below.",
    ],
  },
  {
    heading: "confidentiality of your project details",
    paragraphs: [
      "Any project details, briefs, ideas, or materials you share with us, whether through the contact form or in later conversations, are treated as confidential. We do not share, reuse, or disclose this information to any other client, supplier, or third party.",
    ],
  },
  {
    heading: "where it’s stored",
    paragraphs: [
      "Messages submitted through the contact form are delivered directly to litenby’s email inbox. We do not maintain a separate database of submissions.",
    ],
  },
  {
    heading: "cookies and analytics",
    paragraphs: [
      "This site does not currently use tracking cookies or analytics tools. If that changes in the future, we will update this policy to reflect it before any such tools go live.",
    ],
  },
  {
    heading: "third-party services",
    paragraphs: [
      "This website is built and hosted using Lovable. Form submissions are delivered to litenby’s email through the site’s standard functionality. We do not share your information with any other third party.",
    ],
  },
  {
    heading: "your rights",
    paragraphs: [
      "You can ask us to delete any message or personal information you’ve submitted at any time. To do so, simply email us at the address below and we’ll remove it.",
    ],
  },
  {
    heading: "changes to this policy",
    paragraphs: [
      'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated “last updated” date.',
    ],
  },
  {
    heading: "contact",
    paragraphs: [
      "Questions about this policy or your data? Reach out to us at info@litenby.net.",
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    heading: "scope",
    paragraphs: [
      "These Terms of Service apply to your use of the litenby website. They don’t cover the terms of any client project, proposal, or agreement, those are handled separately and directly with each client.",
    ],
  },
  {
    heading: "site content",
    paragraphs: [
      "All content on this website, including copy, visuals, and design, is original work created by litenby, unless otherwise noted.",
    ],
  },
  {
    heading: "ownership of ideas and creative work",
    paragraphs: [
      "Concepts, ideas, designs, and creative direction developed by litenby in the course of an inquiry or project remain the intellectual property of litenby unless and until formally transferred as part of a completed, paid engagement. You may not share, reproduce, or hand off litenby’s creative work or ideas to another party without our written consent. Full terms covering ownership transfer are set out in the individual project agreement signed at the start of each engagement.",
    ],
  },
  {
    heading: "portfolio and client work",
    paragraphs: [
      "Work shown in our portfolio is presented to illustrate our creative process and capabilities. In some cases, what’s displayed has been adapted or reworked from the final deliverable a client received, the core concept, message, or direction is preserved, but the specific execution shown may differ. If you are a featured client and would like your work removed or credited differently, contact us and we’ll take care of it promptly.",
    ],
  },
  {
    heading: "product images and samples",
    paragraphs: [
      "Product photography shown in our packaging catalog reflects the actual sample provided by our manufacturing partners, professionally reshot for a consistent look and quality across our catalog. Labels and designs shown on these products are digital mockups applied to demonstrate customization options, the underlying bottle, jar, or container matches the physical sample, which is available for you to view in person before ordering.",
    ],
  },
  {
    heading: "ordering and fulfillment",
    paragraphs: [
      "Specific terms for placing an order, including payment, lead times, and delivery, are provided directly to you in a separate agreement at the time of ordering. litenby coordinates production with our manufacturing partners on your behalf; we are not the manufacturer of these products.",
    ],
  },
  {
    heading: "no guarantee of response via contact form",
    paragraphs: [
      "Submitting an inquiry through this website does not create a client relationship or guarantee a response within any specific timeframe. We aim to reply within 1 business day, but this is a target, not a commitment.",
    ],
  },
  {
    heading: "acceptable use",
    paragraphs: [
      "You agree not to misuse this website, including submitting spam, attempting to scrape or copy site content without permission, or using the contact form for anything other than genuine inquiries.",
    ],
  },
  {
    heading: "limitation of liability",
    paragraphs: [
      "This website is provided as-is. litenby is not responsible for any damages or losses resulting from your use of the site, including temporary unavailability or errors in content.",
    ],
  },
  {
    heading: "governing law",
    paragraphs: ["These terms are governed by the laws of Lebanon."],
  },
  {
    heading: "changes to these terms",
    paragraphs: [
      'We may update these Terms of Service from time to time. Changes will be reflected on this page with an updated “last updated” date.',
    ],
  },
  {
    heading: "contact",
    paragraphs: [
      "Questions about these terms? Reach out to us at info@litenby.net.",
    ],
  },
];

const legalPages = {
  privacy: {
    title: "privacy policy",
    updated: "last updated: september 19, 2026",
    sections: privacySections,
  },
  terms: {
    title: "terms of service",
    updated: "last updated: september 19, 2026",
    sections: termsSections,
  },
};

type LegalProps = {
  page: keyof typeof legalPages;
};

export default function Legal({ page }: LegalProps) {
  const content = legalPages[page];

  return (
    <div className="min-h-screen bg-background">
      <LitenbyNavbar />
      <main className="pt-28 pb-20 md:pt-36 md:pb-28">
        <article className="mx-auto max-w-4xl px-6">
          <header className="mb-14 md:mb-20">
            <h1 className="font-heading text-4xl font-extrabold lowercase text-primary md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">
              {content.updated}
            </p>
          </header>

          <div className="space-y-10 md:space-y-12">
            {content.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="font-heading text-xl font-extrabold lowercase text-foreground md:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl font-body text-base leading-7 text-foreground md:text-lg md:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}