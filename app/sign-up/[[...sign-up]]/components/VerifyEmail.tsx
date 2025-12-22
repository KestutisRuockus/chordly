"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClerkAPIResponseError } from "@clerk/shared";

const VerifyEmail = ({ onVerified }: { onVerified: () => void }) => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setIsVerifying(true);
    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        onVerified();
        router.push("/");
      }
    } catch (err) {
      const message =
        (err as ClerkAPIResponseError).errors?.[0]?.message ??
        "Invalid verification code";

      setError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
    } catch (err) {
      console.error("Failed to resend code", err);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <h2 className="text-lg font-medium">Verify your email</h2>

        <p className="text-sm text-gray-600">
          We sent a 6-digit verification code to your email address.
        </p>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter verification code"
          required
          className="border p-2"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button type="submit" disabled={isVerifying} className="border p-2">
          {isVerifying ? "Verifying..." : "Verify Email"}
        </button>

        <button
          type="button"
          onClick={resendCode}
          className="text-sm underline text-left"
        >
          Resend code
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
