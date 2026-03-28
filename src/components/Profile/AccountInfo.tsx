import React from "react";

import { Button } from "@/shared/components";
import { Form } from "@/shared/components/Form";
import { useUserStore } from "@/shared/stores/useUserStore";

type AccountUser = {
  username: string;
  email: string;
  password: string;
};

const MOCK_USER: AccountUser = {
  username: "example-user",
  email: "user@example.com",
  password: "examplepassword",
};

export const AccountInfo = () => {
  const email = MOCK_USER.email; // later replace with Rudex API
  const [password, setPassword] = React.useState(MOCK_USER.password);

  const handleSave = async () => {
    // TODO: call rudexClient.updateUser(...)
    console.log("Saving account info", { email, password });
  };

  return (
    <section className="rounded-lg border-2 border-rave-white/10 bg-rave-black p-6 text-rave-white flex flex-col gap-6">
      <Form.Root>
        <Form.Title>Account Info</Form.Title>

        {/* Username (from Rudex) */}
        <Form.Input
          label="Username"
          value={MOCK_USER.username}
          disabled
        />

        {/* Email (from Rudex) */}
        <Form.Input
          label="Email"
          value={MOCK_USER.email}
          disabled
        />

        {/* Current password*/}
        <Form.Input
          label="Current Password"
          type="password"
          placeholder="********"
          value={password}
          disabled
        />

        {/* Password update */}
        <Form.Input
          label="New Password"
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Optional helper text */}
        <p className="text-xs text-rave-white/60">
          Password must be at least 6 characters.
        </p>

        {/* Re-enter password update */}
        <Form.Input
          label=" Re-enter New Password"
          type="password"
          placeholder="Re-enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <Button size="medium" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </Form.Root>
    </section>
  );
};
