import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactExperience from "./ContactExperience";
import HomePageNavBar from "../HomePageNavBar";
import Form from "@/shared/components/Form";
import Footer from "@/shared/components/Footer";


type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

const ContactUs: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
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

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      );

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

      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-5 text-center">
          <h2
            className="font-chakraBold font-bold
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        tracking-wider sm:tracking-wide
        leading-tight
        mb-10 sm:mb-3"
          >
            Contact Us
          </h2>
          <p
            className="text-center
      tracking-normal sm:tracking-wide
      mt-4 sm:mt-6 md:mt-8
      text-sm sm:text-base md:text-lg lg:text-xl
      mx-auto
      max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%]
      leading-relaxed"
          >
            Have a question or an idea? Send a message and we’ll reply soon.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left */}
          <div className="lg:col-span-5">
            <Form.Root
              className="mx-auto bg-[var(--color-form-gray)]"
              gap={20}
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
              />

              <Form.Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="@example.com"
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
                  rows={5}
                  className="px-3 py-2 rounded-md bg-black/50 border border-neutral-300 text-(--color-neutral-50) placeholder:text--neutral-300 opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) transition-colors w-full"
                  placeholder="How can I help?"
                  required
                />
              </div>

              {status === "success" && (
                <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  Sent! Thanks — We’ll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-(--color-red)">
                  Something went wrong. Please try again.
                </div>
              )}

              <Form.Button
                type="submit"
                disabled={loading}
                className="min-w-full my-1.5"
              >
                {loading ? "Sending..." : "Send message"}
              </Form.Button>
            </Form.Root>
          </div>

          {/* Right */}
          <div className="lg:col-span-7">
            <div className="h-[500px] overflow-hidden rounded-md border:transparent ">
                <ContactExperience />
            </div>
          </div>
        </div>
      </div>
            <Footer />
    </section>
  );
};

export default ContactUs;
