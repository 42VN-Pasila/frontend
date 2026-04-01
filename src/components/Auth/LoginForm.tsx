import { rudexClient } from "@/shared/api/rudexClient";
import { useAuth } from "@/shared/auth/useAuth";
import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleIcon } from "@/components/Auth/GoogleIcon";

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameError, setUsernameError] = React.useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameError) return;

    try {
      const response = await rudexClient.login({
        username,
        password,
      });

      login(response);
      navigate("/dashboard", { replace: true });

    } catch (error) {
      //Display pop up error noti
      console.log("Error", error);
    }
  };

  return (
    <Form.Root className="mx-auto bg-rave-black" gap={20} onSubmit={handleLogin}>
      <div className="flex flex-col gap-2">
        <Form.Title textAlign="center" textSize="medium">
          Welcome to Blank
        </Form.Title>
        <p className="text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-rave-red hover:underline cursor-pointer"
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
        onChange={(e) => {
          setUsername(e.target.value);
          if (usernameError) {
            setUsernameError(null);
          }
        }}
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

      <Button type="submit" size="medium" fullWidth>
        Login
      </Button>
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-rave-white/20"></div>
        <span className="test-xs">OR</span>
        <div className="flex-1 h-px bg-rave-white/20"></div>
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
