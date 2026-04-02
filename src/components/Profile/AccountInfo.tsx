import { useEffect, useState } from "react";
import { Button } from "@/shared/components";
import { Form } from "@/shared/components/Form";

type AccountInfoProps = {
  username: string;
  displayname?: string;
  email: string;
}

const displayNameRules = [
  { regex: /^.{3,16}$/, error: "Display name must be 3–16 characters." },
];

const passwordRules = [
  { regex: /^.{8,16}$/, error: "Password must be 8–16 characters." },
  { regex: /[a-z]/, error: "At least 1 lowercase letter required." },
  { regex: /[A-Z]/, error: "At least 1 uppercase letter required." },
  { regex: /\d/, error: "At least 1 number required." },
  { regex: /[\W_]/, error: "At least 1 special character required." },
  {
    regex: /^[^\s'"\\;]+$/,
    error: "No whitespace, quotes, or backslashes allowed.",
  },
];

const validate = (value: string, rules: typeof passwordRules) => {
  const failed = rules.find((r) => !r.regex.test(value));
  return failed?.error ?? null;
};

export const AccountInfo = (data: AccountInfoProps) => {

  const resolvedDisplayName =
    data.displayname?.trim() || data.username;

  const [displayName, setDisplayName] = useState(resolvedDisplayName);

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [displayMsg, setDisplayMsg] = useState<string | null>(null);
  const [displayError, setDisplayError] = useState<string | null>(null);

  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setDisplayName(resolvedDisplayName);
  }, [resolvedDisplayName]);

  const newPasswordError =
    password.new.length > 0
      ? validate(password.new, passwordRules)
      : null;

  const confirmPasswordError =
    password.confirm &&
    password.confirm !== password.new
      ? "Passwords do not match"
      : null;

  const resetDisplayMessages = () => {
    setDisplayError(null);
    setDisplayMsg(null);
  };

  const resetSubmitMessages = () => {
    setSubmitError(null);
    setSubmitMsg(null);
  };

  const handleDisplayNameSave = () => {
    resetDisplayMessages();

    const value = displayName.trim();
    const current = resolvedDisplayName.trim();

    if (!value) return setDisplayError("Display name cannot be empty");
    if (value === current) return setDisplayError("No changes detected");

    const error = validate(value, displayNameRules);
    if (error) return setDisplayError(error);

    // TODO: API call
    setDisplayName(value);
    setDisplayMsg("Ready to send update to Rudex.");
  };

  const handlePasswordChange = () => {
    resetSubmitMessages();

    if (!password.current)
      return setSubmitError("Current password is required");

    if (newPasswordError)
      return setSubmitError(newPasswordError);

    if (confirmPasswordError)
      return setSubmitError(confirmPasswordError);

    // TODO: API call
    console.log("Password change request", { email: data.email });

    setPassword({ current: "", new: "", confirm: "" });
    setSubmitMsg("Ready to send password update to Rudex.");
  };

  return (
    <section className="rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white flex flex-col gap-6">
      <Form.Root>
        <Form.Title>Account Info</Form.Title>

        <Form.Input label="Username" value={data.username} disabled />
        <Form.Input label="Email" value={data.email} disabled />

        {/* Display name */}
        <Form.Input
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          onBlur={resetDisplayMessages}
          required
        />

        {displayError && <p className="text-sm text-rave-red">{displayError}</p>}
        {displayMsg && <p className="text-sm text-green-400">{displayMsg}</p>}

        <div className="flex justify-end">
          <Button
            size="medium"
            onClick={handleDisplayNameSave}
            disabled={!displayName.trim()}
          >
            Save
          </Button>
        </div>

        {/* Password */}
        <Form.Input
          label="Current Password"
          type="password"
          value={password.current}
          onChange={(e) =>
            setPassword((p) => ({ ...p, current: e.target.value }))
          }
          onBlur={resetSubmitMessages}
          required
        />

        <Form.Input
          label="New Password"
          type="password"
          value={password.new}
          onChange={(e) =>
            setPassword((p) => ({ ...p, new: e.target.value }))
          }
          onBlur={resetSubmitMessages}
          required
          error={newPasswordError}
        />

        <p className="text-xs text-rave-white/60">
          8–16 chars, uppercase, lowercase, number, special character.
        </p>

        <Form.Input
          label="Re-enter New Password"
          type="password"
          value={password.confirm}
          onChange={(e) =>
            setPassword((p) => ({ ...p, confirm: e.target.value }))
          }
          onBlur={resetSubmitMessages}
          required
          error={confirmPasswordError}
        />

        {submitError && <p className="text-sm text-rave-red">{submitError}</p>}
        {submitMsg && <p className="text-sm text-green-400">{submitMsg}</p>}

        <div className="flex justify-end pt-2">
          <Button
            size="medium"
            onClick={handlePasswordChange}
            disabled={
              !password.current || !password.new || !password.confirm
            }
          >
            Change
          </Button>
        </div>
      </Form.Root>
    </section>
  );
};