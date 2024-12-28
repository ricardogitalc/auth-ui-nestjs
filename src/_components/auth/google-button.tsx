import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { initiateGoogleAuth } from "@/_auth/client/api-client";

export function GoogleButton() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-4 text-muted-foreground">OU</span>
        </div>
      </div>
      <Button
        onClick={() => initiateGoogleAuth()}
        variant="outline"
        className="w-full bg-muted-foreground/5 hover:bg-muted-foreground/15 border-border"
      >
        <FcGoogle className="h-6 w-6" />
        Continue com Google
      </Button>
    </>
  );
}
