import { rudexClient } from "@/shared/api/rudexClient";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link } from "react-router-dom";
import { useValidation } from "@/shared/components/features/Validations/UseValdiation";
import { GoogleIcon } from "@/shared/components/features/Validations/GoogleIcon";

export const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { errors, validate, validateAll } = useValidation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAll({
      usernameRegister: username,
      email: email,
      password: password,
    });
    if (!isValid) return;
    await rudexClient.register({
      username,
      password,
      email,
    });
  };
  return (
    <Form.Root
      className="mx-auto bg-[var(--color-neutral-900)] rounded-lg shadow-md"
      gap={20}
    >
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={(e) => validate("usernameRegister", e.target.value)}
        error={errors.usernameRegister}
      />
      <Form.Input
        label="Email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => validate("email", e.target.value)}
        error={errors.email}
      />
      <div className="flex flex-col gap-1">
        <Form.Input
          label="Password"
          type="password"
          required
          placeholder="Password"
          value={[password]}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => validate("password", e.target.value)}
          error={errors.password}
        />
        <p className="text-xs">
          Password has to be at least 6 character. No special symbols: * / & @
        </p>
      </div>
      <Button
        type="submit"
        className="w-full text-4xl sm:text-lg md:text-xl"
        size="small"
        
        onClick={handleRegister}
      >
        Register
      </Button>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-500"></div>
        <span className="test-xs">OR</span>
        <div className="flex-1 h-px bg-gray-500"></div>
      </div>
      <Button
        type="button"
        size="small"
        variant="landing"
        emphasis="low"
        className="text-4xl sm:text-lg md:text-xl"
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
