"use client";

import { createBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@optima/ui/button";

export function GoogleSignin() {
  const supabase = createBrowserClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="font-mono">
      Sign in with Google
    </Button>
  );
}
