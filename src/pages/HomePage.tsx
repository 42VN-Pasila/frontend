import colors from "../theme/colors";
import { Button } from "../ui/components";
import Form from "../ui/components/Form";

const HomePage = () => {
  return (
    <main className="w-full max-w-[1200px] mx-auto py-16 px-6 text-[#CCC8C7]">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#FF5F24]">
          Cosmic Pong
        </h1>
        <p className="text-lg max-w-2xl mx-auto leading-relaxed">
          Description for ping pong game. Description for ping pong game.
          Description for ping pong game Description for ping pong game
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
      <Form.Root backgroundColor={colors.secondaryBlack}>
        <Form.Title textSize="large" textAlign="center">
          Login
        </Form.Title>
        <Form.Input
          required
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Form.Input
          required
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        <Form.Button className="w-full mt-4">Submit</Form.Button>
      </Form.Root>
    </main>
  );
};

export default HomePage;
