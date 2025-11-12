import { Button } from "../ui/components";

const HomePage = () => {
  return (
    <main className="w-full max-w-[1200px] mx-auto py-16 px-6 text-[#CCC8C7]">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#FF5F24]">
          Hive Platform
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Accelerate your workflow with a modular UI system. Explore components,
          customize themes, and build faster.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button size="large" variant="primary" emphasis="high">
            Get Started
          </Button>
          <Button size="large" variant="secondary" emphasis="high">
            Learn More
          </Button>
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Composable",
            desc: "Build pages quickly using reusable building blocks.",
          },
          {
            title: "Accessible",
            desc: "Focus states and semantics baked in from the start.",
          },
          {
            title: "Themeable",
            desc: "Adjust colors, typography, and spacing to match your brand.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-lg bg-black/40 backdrop-blur-sm p-6 border border-[#FF5F24]/30 shadow"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FF5F24]">
              {f.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#CCC8C7]">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default HomePage;
