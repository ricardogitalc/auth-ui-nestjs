import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full bg-muted-foreground/5 hover:bg-muted-foreground/15"
    >
      <FcGoogle className="h-5 w-5" />
      Entrar com google
    </Button>
  );
}
