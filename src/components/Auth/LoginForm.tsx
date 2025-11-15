import { Button } from "../../shared/components";
import Form from "../../shared/components/Form";

export const LoginForm = () => {
  return (
    <Form.Root
      className="max-w-md mx-auto p-6 bg-[var(--color-neutral-900)] rounded-lg shadow-md"
      gap={30}
    >
      <div className="flex flex-col gap-2">
        <Form.Title textAlign="center" textSize="medium">
          Welcome to Cosmos Pong
        </Form.Title>
        <p className="text-center">
          Don’t have an account?
          <span className="text-[var(--color-primary)] hover:underline cursor-pointer">
            Sign up
          </span>
        </p>
      </div>
      <Form.Input label="Username" required placeholder="Username" />
      <div className="flex flex-col gap-1">
        <Form.Input
          label="Password"
          type="password"
          required
          placeholder="Password"
        />
        <p className="text-xs">
          Password has to be at least 6 character. No special symbols: * / & @
        </p>
      </div>

      <Button type="submit" className="w-full" size="large">
        Login
      </Button>
      <p className="text-xs text-center">
        By continuing, you agree to the Pong Terms of Service and Privacy Policy
      </p>
    </Form.Root>
  );
};
