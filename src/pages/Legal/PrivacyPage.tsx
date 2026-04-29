import React from "react";

import { Link } from "react-router-dom";

import HomePageNavBar from "@/pages/HomePage/HomePageNavBar";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen background-color">
      <HomePageNavBar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="md:col-span-8 lg:col-span-9 bg-white/5 border border-white/6 rounded-xl p-8 shadow-sm">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">Privacy Policy</h1>
            <p className="text-sm leading-relaxed text-gray-200">
              42-Pasila ("we", "our", "us") respects your privacy. This Privacy
              Policy explains what information we collect, how we use it, and
              the choices you have regarding your information when using our
              website and services.
            </p>
          </header>

          <section id="info-we-collect" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Information We Collect</h2>
            <p className="text-sm leading-relaxed">
              <strong>Account information:</strong> name, email, username when
              you register.
              <br />
              <strong>Profile and social data:</strong> friend lists, avatar,
              and preferences you provide.
              <br />
              <strong>Usage data:</strong> pages visited, gameplay activity, and
              performance metrics.
              <br />
              <strong>Connection data:</strong> IP address and session metadata
              for security and real-time features.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="how-we-use" className="mb-6">
            <h2 className="text-xl font-medium mb-2">
              How We Use Your Information
            </h2>
            <p className="text-sm leading-relaxed">
              We use information to provide and improve the service, enable
              social features (friends, matches), detect and prevent abuse,
              personalize your experience, and communicate important updates.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="third-party" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Third-Party Services</h2>
            <p className="text-sm leading-relaxed">
              We may share analytics and crash reports with third-party
              providers, and use external APIs (e.g., for authentication,
              analytics, or multiplayer transport). These providers have their
              own privacy practices.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="cookies" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Cookies and Tracking</h2>
            <p className="text-sm leading-relaxed">
              We use cookies and similar technologies to store preferences and
              support features. You can control cookies through your browser
              settings.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="rights" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Your Rights</h2>
            <p className="text-sm leading-relaxed">
              Depending on your jurisdiction, you may access, correct, or
              request deletion of your personal data. To exercise these rights
              or for privacy questions, contact us at{" "}
              <Link to="/contact" className="underline">
                Contact
              </Link>
              .
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="data-retention" className="mb-6">
            <h2 className="text-xl font-medium mb-2">
              Data Retention & Security
            </h2>
            <p className="text-sm leading-relaxed">
              We retain data as needed to provide services and comply with legal
              obligations. We implement reasonable security measures, but no
              system is completely secure.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="changes" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Changes to This Policy</h2>
            <p className="text-sm leading-relaxed">
              We may update this policy; we will post changes on this page with
              an updated effective date.
            </p>
          </section>

          <div className="mt-8 text-sm">
            <strong>Effective date:</strong> April 29, 2026
          </div>
        </article>
      </main>
    </div>
  );
};

export default PrivacyPage;
