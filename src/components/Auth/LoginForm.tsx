import { rudexClient } from "@/shared/api/rudexClient";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link } from "react-router-dom";
import { GoogleIcon } from "@/components/Auth/GoogleIcon";
import {
  useFormInputValidation,
  ValidationField,
} from "@/components/Auth/useFormInputValdiation";

export const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;
    await rudexClient.login({
      username,
      password,
    });
  };

  return (
    <Form.Root
      className="mx-auto bg-[var(--color-neutral-900)]"
      gap={20}
    >
      <div className="flex flex-col gap-2">
        <Form.Title textAlign="center" textSize="medium">
          Welcome to Blank
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
        onBlur={(e) =>
          setUsernameError(
            useFormInputValidation(
              ValidationField.usernameLogin,
              e.target.value
            )
          )
        }
        error={usernameError}
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
        size="medium"
        fullWidth
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
        size="medium"
        variant="primary"
        emphasis="low"
        fullWidth
        onClick={() => console.log("LoginGg")}
      >
        <GoogleIcon />
          Continue with Google
      </Button>
      <p className="text-xs text-center">
        By continuing, you agree to the Pong Terms of Service and Privacy Policy
      </p>
    </Form.Root>
  );
};
