import { rudexClient } from "@/shared/api/rudexClient";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await rudexClient.login({
      username,
      password,
    });
  };

  return (
    <Form.Root
      className="mx-auto bg-[var(--color-neutral-900)] rounded-lg shadow-md"
      gap={20}
    >
      <div className="flex flex-col gap-2">
        <Form.Title textAlign="center" textSize="medium">
          Welcome to Cosmos Pong
        </Form.Title>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--color-primary)] hover:underline cursor-pointer"
          >
            Sign up
          </Link>
        </p>
      </div>
      <Form.Input
        label="Username"
        required
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex flex-col gap-1">
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
      </div>

      <Button
        type="submit"
        className="w-full"
        size="large"
        onClick={handleLogin}
      >
        Login
      </Button>
      <p className="text-xs text-center">
        By continuing, you agree to the Pong Terms of Service and Privacy Policy
      </p>
    </Form.Root>
  );
};
