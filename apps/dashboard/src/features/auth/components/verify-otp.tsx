import { Button } from "@optima/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@optima/ui/card";
import { cn } from "@optima/ui/cn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@optima/ui/input-otp";
import { AnimatePresence, motion } from "motion/react";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBoolean, useCountdown } from "usehooks-ts";
import { authSearchParams } from "../auth-search-params";
import { signInAction, verifyOtpAction } from "../auth.actions";

export function VerifyOtp() {
  const router = useRouter();
  const [{ auth_type, redirect_url, email }, setAuthParams] = useQueryStates(
    authSearchParams,
    {
      shallow: true,
    },
  );
  const { execute, isExecuting: isVerifying } = useAction(verifyOtpAction, {
    onError: ({ error }) => {
      toast.error(error.serverError);
      setIsError(true);
    },
    onSuccess: ({ data }) => {
      router.push(data?.redirect_url ?? "/");
    },
  });
  const { execute: resend, isExecuting: isResending } = useAction(
    signInAction,
    {
      onSuccess: (res) => {
        setAuthParams({
          auth_type: res?.data?.properties?.verification_type as
            | "signup"
            | "magiclink",
        });
        resetResendTimer();
        startResendTimer();
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
        resetResendTimer();
        startResendTimer();
      },
    },
  );
  const [
    resendTimer,
    { resetCountdown: resetResendTimer, startCountdown: startResendTimer },
  ] = useCountdown({
    countStart: 59,
    intervalMs: 1000,
  });

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    startResendTimer();
  }, [startResendTimer]);

  async function onComplete(code: string) {
    execute({
      email,
      token: code,
      auth_type: auth_type as "signup" | "magiclink",
      redirect_url,
    });
  }

  return (
    <Card className="flex flex-col items-center max-w-sm w-full mx-auto pt-6 ">
      <CardHeader className="flex flex-col gap-1 items-center w-full">
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          We&apos;ve sent a one time pass code to{" "}
        </CardDescription>
        <CardDescription className="text-secondary-foreground">
          <strong>{email}</strong>
        </CardDescription>
        <Button
          className="text-secondary-foreground"
          onClick={() => {
            setAuthParams({
              email: null,
              auth_type: "magiclink",
              active_tap: "sign-in",
            });
          }}
          variant="outline"
        >
          Wrong email --&gt; change it
        </Button>
      </CardHeader>
      <CardContent className="">
        <h2 className=" font-semibold text-center mb-6">
          Enter the pass code to sign in
        </h2>
        <InputOTP
          // eslint-disable-next-line jsx-a11y/no-autofocus -- This is an OTP input field
          autoFocus
          maxLength={6}
          onComplete={onComplete}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={() => {
            if (isError) {
              setIsError(false);
            }
          }}
          className={cn(isError && "animate-shake")}
        >
          <InputOTPGroup>
            <InputOTPSlot
              index={0}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={1}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={2}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot
              index={3}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={4}
              className={cn(isError && "border-destructive")}
            />
            <InputOTPSlot
              index={5}
              className={cn(isError && "border-destructive")}
            />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      <CardFooter className="w-full grid px-7 ">
        <Button
          disabled={isVerifying || resendTimer !== 0 || isResending}
          onClick={() => resend({ email })}
          variant="secondary"
          className="w-full"
        >
          <AnimatePresence initial={false} mode="wait">
            {isVerifying ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="verifying-otp"
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full"
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Verifying Pass code ...
              </motion.div>
            ) : isResending ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center w-full"
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resending-passcode"
                transition={{ duration: 0.2 }}
              >
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Resending Pass Code ...
              </motion.div>
            ) : resendTimer !== 0 ? (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-timer"
                transition={{ duration: 0.2 }}
              >
                {`Resend Pass code in ${resendTimer}s`}
              </motion.span>
            ) : (
              <motion.span
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
                key="resend-passcode"
                transition={{ duration: 0.2 }}
              >
                Resend Pass code
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </CardFooter>
    </Card>
  );
}
