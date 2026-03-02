"use client";

import type { ClerkAPIResponseError } from "@clerk/shared";
import { useSignIn, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/content/auth";
import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import HeroSection from "@/components/sections/HeroSection";

const SignInPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const { setActive } = useClerk();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <Main>
      <HeroSection {...auth.login} />
      <Section className="max-w-sm">
        <form onSubmit={handleSignIn} className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-xs font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 outline-ring"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-xs font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 outline-ring"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label htmlFor="rememberMe" className="flex items-center gap-2">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-primary"
              />
              Remember me
            </label>

            <Link href="/forgot-password" className="underline">
              Forgot your password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="border p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/70 transition-colors duration-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </p>
      </Section>
    </Main>
  );
};

export default SignInPage;
