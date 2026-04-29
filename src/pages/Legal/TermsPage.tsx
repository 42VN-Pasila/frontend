import React from "react";

import { Link } from "react-router-dom";

import HomePageNavBar from "@/pages/HomePage/HomePageNavBar";

const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen background-color">
      <HomePageNavBar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="md:col-span-8 lg:col-span-9 bg-white/5 border border-white/6 rounded-xl p-8 shadow-sm">
          <header className="mb-6">
            <h1 className="text-3xl font-semibold mb-2">Terms of Use</h1>
            <p className="text-sm leading-relaxed text-gray-200">
              Welcome to 42-Pasila. By accessing or using our website and
              services, you agree to these Terms of Use. Please read them
              carefully.
            </p>
          </header>

          <section id="accepting" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Accepting the Terms</h2>
            <p className="text-sm leading-relaxed">
              You must be at least 13 years old (or the minimum age in your
              jurisdiction) to use our services. By creating an account, you
              represent that you meet the eligibility requirements.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="conduct" className="mb-6">
            <h2 className="text-xl font-medium mb-2">User Conduct</h2>
            <p className="text-sm leading-relaxed">
              You agree not to engage in abusive, illegal, or harmful behavior.
              Harassment, cheating, exploitation of vulnerabilities, or attempts
              to interfere with the service are prohibited.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="ip" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              All content provided by 42-Pasila is protected by copyright and
              other intellectual property laws. You may not copy or redistribute
              our content without permission.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="termination" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Termination</h2>
            <p className="text-sm leading-relaxed">
              We reserve the right to suspend or terminate accounts that violate
              these terms or disrupt the service.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="disclaimers" className="mb-6">
            <h2 className="text-xl font-medium mb-2">
              Disclaimers & Limitation of Liability
            </h2>
            <p className="text-sm leading-relaxed">
              The service is provided "as is" without warranties. To the maximum
              extent permitted by law, 42-Pasila is not liable for damages
              arising from your use of the service.
            </p>
          </section>

          <hr className="border-white/6 my-4" />

          <section id="law" className="mb-6">
            <h2 className="text-xl font-medium mb-2">Governing Law</h2>
            <p className="text-sm leading-relaxed">
              These Terms are governed by the laws of the jurisdiction in which
              42-Pasila operates.
            </p>
          </section>

          <div className="mt-8 text-sm">
            For questions, contact us via{" "}
            <Link to="/about" className="underline">
              About Us
            </Link>
            .
          </div>
        </article>
      </main>
    </div>
  );
};

export default TermsPage;
