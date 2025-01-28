"use client";

import { Button } from "@optima/ui/button";
import { Card } from "@optima/ui/card";
import { Icons } from "@optima/ui/icons";
import { Input } from "@optima/ui/inputs";
import { Label } from "@optima/ui/label";
import { Separator } from "@optima/ui/separator";
import { AnimatePresence, motion } from "motion/react";

import { Mail01Icon } from "hugeicons-react";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { z } from "zod";
import { authSearchParams } from "../auth-search-params";
import { signInAction } from "../auth.actions";

export function SignIn() {
  const { execute, isExecuting } = useAction(signInAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
    },
    onSuccess: (res) => {
      setAuthParams({
        auth_type: res?.data?.properties?.verification_type as
          | "signup"
          | "magiclink",
        email: res?.data?.user?.email,
        active_tap: "verify-otp",
      });
    },
  });
  const [_, setAuthParams] = useQueryStates(authSearchParams, {
    shallow: true,
  });

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  async function handleSignInWithEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    const parsedEmail = z.string().email().safeParse(email);
    if (!parsedEmail.success) {
      setEmailError("Invalid email address");
      return;
    }
    execute({ email: parsedEmail.data });
  }

  useEffect(() => {
    if (emailError) {
      setEmailError(undefined);
    }
  }, [email]);
  return (
    <Card className="flex flex-col py-10 px-0 max-w-sm w-full mx-auto">
      <Icons.Logo className="size-14 mx-auto mb-4" />
      <h2 className="mb-0.5 text-lg font-bold text-center">Welcome back</h2>
      <p className="text-center text-secondary-foreground">
        Sign in to your account to continue
      </p>

      <section className="space-y-4 px-4 mt-8">
        <form onSubmit={handleSignInWithEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              startIcon={<Mail01Icon size={20} />}
              placeholder="example@domain.com"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <Button
            variant="secondary"
            disabled={isExecuting}
            type="submit"
            className="w-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExecuting ? (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  key="sending-otp"
                >
                  <Loader className="animate-spin size-4 mr-2" />
                  Sending otp email...
                </motion.span>
              ) : (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  key="continue"
                >
                  Continue
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
      </section>
      <Separator className="my-6 w-full" />
      <section className="space-y-1 px-4">
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">
            By signing in you agree to our{" - "}
          </p>
          <Button variant="link" className="p-0">
            Terms of Service
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className=" text-sm text-secondary-foreground">Need help ?</p>
          <Button variant="link" className="p-0">
            Contact Support
          </Button>
        </div>
      </section>
    </Card>
  );
}
