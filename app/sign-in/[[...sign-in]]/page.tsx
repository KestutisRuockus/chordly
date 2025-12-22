"use client";

import { useSignIn, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClerkAPIResponseError } from "@clerk/shared";

const SignInPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { setActive } = useClerk();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        router.push("/");
      }
    } catch (err) {
      const message =
        (err as ClerkAPIResponseError).errors?.[0]?.message ??
        "Invalid email or password";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-lg font-medium mb-4">Sign In</h2>

      <form onSubmit={handleSignIn} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button disabled={loading} className="border p-2">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
