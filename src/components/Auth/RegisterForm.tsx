import { rudexClient } from "@/shared/api/rudexClient";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await rudexClient.register({
      username,
      password,
      email,
    });
  };
  return (
    <Form.Root className="mx-auto bg-[var(--color-neutral-900)] rounded-lg shadow-md" gap={30}>
		
      <div className="flex flex-col gap-2">
        <Form.Title textAlign="center" textSize="medium">
          Create a New Account
        </Form.Title>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--color-primary)] hover:underline cursor-pointer"
          >
            Log in
          </Link>
        </p>
      </div>
      <Form.Input
        label="Username"
        required
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Form.Input
        label="Email"
        required
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Input
        label="Password"
        type="password"
        required
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p className="text-xs">
        Password has to be at least 6 character. No special symbols: * / & @
      </p>
      <Button
        type="submit"
        className="w-full"
        size="large"
        onClick={handleRegister}
      >
        Register
      </Button>
      <p className="text-xs text-center">
        By continuing, you agree to the Pong Terms of Service and Privacy Policy
      </p>
    </Form.Root>
  );
};
