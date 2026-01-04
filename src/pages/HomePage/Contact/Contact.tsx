import React, { useRef, useState } from "react";
import HomePageNavBar from "../HomePageNavBar";
import Form from "@/shared/components/Form";
import Footer from "@/shared/components/Footer";
import SupportWorker from "./SupportWorker.png";

import emailjs from "@emailjs/browser";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    message: "",
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setStatus("idle");
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );
      await minDelay;
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      formRef.current.reset();
    } catch (err) {
      console.log("EmailJS error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <HomePageNavBar />
      <div className="mx-auto w-full max-w-6xl px-3  ">
        <div className="text-center mt-[4vh] sm:mt-[8vh] lg:mt-[5vh] mb-10">
          <p
            className="
                      font-chakraBold font-bold
                      text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                      tracking-wider sm:tracking-wide
                      leading-tight
                      mb-10 sm:mb-3
                    "
          >
            Contact Us!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-center ">
          <div className="lg:col-span-5 max-w-[1200px] flex justify-center py-2 px-4">
            <Form.Root
              className="w-full max-w-[480px] bg-[var(--color-form-gray)]"
              gap={10}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <Form.Input
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="What's your name?"
                autoComplete="name"
              />

              <Form.Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                autoComplete="email"
              />

              <div>
                <Form.Label
                  required
                  htmlFor="message"
                  className="text-[var(--color-neutral-50)]"
                >
                  Message
                </Form.Label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-neutral-300 bg-black/50 px-3 py-2
                text-[var(--color-neutral-50)] placeholder:text-neutral-300/70
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
                transition"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div role="status" aria-live="polite">
                {status === "success" && (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Sent! Thanks — We’ll get back to you soon.
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-[var(--color-red)]">
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>

              <Form.Button
                type="submit"
                disabled={loading}
                className="w-full"
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <span>Sending</span>
                    <span
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  "Send message"
                )}
              </Form.Button>
            </Form.Root>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 hidden lg:flex items-center justify-center">
            <img
              src={SupportWorker}
              alt="Customer support illustration"
              className="w-full max-w-[720px] h-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default ContactUs;
