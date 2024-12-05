"use client";

import { AnimatePresence, motion } from "motion/react";
import { useQueryStates } from "nuqs";
import React from "react";
import { authSearchParams } from "../auth-search-params";
import { SignIn } from "./sign-in";
import { VerifyOtp } from "./verify-otp";

export function AuthComponent() {
  const [{ auth_type, active_tap }] = useQueryStates(authSearchParams, {
    shallow: true,
  });

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={active_tap}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="w-full"
      >
        {active_tap === "sign-in" ? (
          <SignIn />
        ) : active_tap === "verify-otp" ? (
          <VerifyOtp />
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}
