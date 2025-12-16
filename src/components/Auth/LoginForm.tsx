import { rudexClient } from "@/shared/api/rudexClient";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "@/components/Auth/GoogleIcon";
import { useValidation } from "@/components/Auth/useValdiation";

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { errors, validate, validateAll } = useValidation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAll({
      usernameLogin: username,
    });
    if (!isValid) return;
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={(e) => validate("usernameLogin", e.target.value)}
        error={errors.usernameLogin}
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
        className="w-full w-full text-4xl sm:text-lg md:text-xl"
        size="small"
        onClick={handleLogin}
      >
        Login
      </Button>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-500"></div>
        <span className="test-xs">OR</span>
        <div className="flex-1 h-px bg-gray-500"></div>
      </div>
      <Button
        type="button"
        size="small"
        variant="primary"
        emphasis="high"
        onClick={() => console.log("LoginGg")}
      >
        <GoogleIcon className="w-6 h-10" />
        <span className="text-4xl sm:text-lg md:text-xl font-medium text-white">
          Continue with Google
        </span>
      </Button>
      <p className="text-xs text-center">
        By continuing, you agree to the Pong Terms of Service and Privacy Policy
      </p>
    </Form.Root>
  );
};
