import { motion } from "framer-motion";
import { Mail, Phone, Globe } from "lucide-react";
import { LitenbyNavbar } from "@/components/LitenbyNavbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactItems = [
  { icon: Mail, label: "Email", value: "hello@litenby.com" },
  { icon: Phone, label: "Phone", value: "+971 50 000 0000" },
  { icon: Globe, label: "OPERATIONS", value: "Global Remote Studio" },
];

export default function Contact() {
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      <LitenbyNavbar />

      {/* Hero header */}
      <section className="pb-8 pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-3 inline-block font-body text-sm font-semibold uppercase tracking-widest text-primary"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-extrabold lowercase text-foreground md:text-5xl lg:text-[68px]"
          >
            contact
          </motion.h1>
        </div>
      </section>

      {/* Contact split layout */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-16 lg:grid-cols-2 lg:gap-24"
          >
            {/* Left column — info */}
            <div className="flex flex-col justify-center space-y-10">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl font-extrabold lowercase text-foreground md:text-4xl lg:text-5xl">
                  let's start the experiment
                </h2>
                <p className="max-w-md font-body text-base leading-relaxed text-muted-foreground">
                  If you have any questions regarding our services or need help,
                  please fill out the form. We do our best to respond within 1
                  business day.
                </p>
              </div>

              <div className="space-y-6">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-border/20">
                      <item.icon className="size-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                        {item.label}
                      </p>
                      <p className="font-body text-sm text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column — form */}
            <div className="flex flex-col justify-center">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                      First Name
                    </label>
                    <Input
                      placeholder="John"
                      className="rounded-[10px] border-2 border-primary bg-transparent font-body text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                      Last Name
                    </label>
                    <Input
                      placeholder="Doe"
                      className="rounded-[10px] border-2 border-primary bg-transparent font-body text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="hello@example.com"
                    className="rounded-[10px] border-[#333333] bg-transparent font-body text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    className="rounded-[10px] border-[#333333] bg-transparent font-body text-foreground placeholder:text-muted-foreground/30 focus-visible:ring-0 focus-visible:border-primary transition-colors duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-body font-semibold"
                >
                  send message
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
