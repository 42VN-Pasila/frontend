import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import ContactExperience from "./ContactExperience.tsx";
import { Suspense } from "react";
import HomePageNavBar from "../HomePageNavBar.tsx";

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

  // 1 handler dùng cho cả input và textarea
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
    <section className="w-full py-14">
      <HomePageNavBar/>
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900">
            Contact Us
          </h2>
          <p className="mt-2 text-neutral-600">
            Have a question or an idea? Send a message and I’ll reply soon.
          </p>
        </div>

        {/* Layout 2 cột: lg:grid-cols-12 */}
        <div className="grid gap-8 lg:grid-cols-14">
          {/* Left: Form */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col gap-8"
              >
                <div>
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="name"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    placeholder="What’s your name?"
                    required
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-medium text-neutral-800"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="mt-2 w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-400"
                    placeholder="How can I help?"
                    required
                  />
                </div>

                {/* Status message */}
                {status === "success" && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Sent! Thanks — I’ll get back to you soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800 disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>

          {/* Right: 3D */}
          <div className="lg:col-span-8">
            <div className="h-[500px] overflow-hidden rounded-3xl bg-black">
              <Suspense
                fallback={<div className="p-4 text-white">Loading 3D...</div>}
              >
                <ContactExperience />
              </Suspense>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              Tip: drag to rotate the card.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
