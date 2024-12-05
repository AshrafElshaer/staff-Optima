"use client";

import { createBrowserClient } from "@/lib/supabase/browser";
import { Button } from "@optima/ui/button";
import { Icons } from "@optima/ui/icons";

export function SignOut() {
  const supabase = createBrowserClient();

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  return (
    <Button
      onClick={handleSignOut}
      variant="outline"
      className="font-mono gap-2 flex items-center"
    >
      <Icons.SignOut className="size-4" />
      <span>Sign out</span>
    </Button>
  );
}
