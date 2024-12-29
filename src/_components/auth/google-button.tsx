import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { initiateGoogleAuth } from "@/_auth/client/api-client";
import Link from "next/link";

export function GoogleButton() {
  return (
    <div className="">
      <div className="space-y-6">
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
          variant="secondary"
          className="w-full"
        >
          <FcGoogle className="h-6 w-6" />
          Continue com Google
        </Button>
      </div>
      <p className="text-xs text-center text-text-foreground pt-3">
        Ao continuar, você concorda com os{" "}
        <Link href="/termos" className="text-primary hover:text-primary/70">
          Termos de Serviço
        </Link>{" "}
        e as{" "}
        <Link
          href="/privacidade"
          className="text-primary hover:text-primary/70"
        >
          Políticas de Privacidade.
        </Link>
      </p>
    </div>
  );
}
