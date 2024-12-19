"use client";

import { verifyRegisterAction } from "@/app/actions/auth.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface VerifyRegisterPageProps {
  searchParams?: {
    token?: string;
  };
}

export default function VerifyRegister({
  searchParams,
}: VerifyRegisterPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const verificationToken = searchParams?.token;

  useEffect(() => {
    if (!verificationToken) {
      router.push("/cadastrar");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await verifyRegisterAction(verificationToken);
        if (response.ok) {
          toast({
            title: "Sucesso",
            variant: "default",
            description: response.message,
          });
          router.push("/entrar");
        } else {
          toast({
            variant: "destructive",
            title: "Erro",
            description: response.message,
          });
          router.push("/cadastrar");
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message,
        });
        router.push("/cadastrar");
      }
    };

    verifyToken();
  }, [verificationToken, router, toast]);
}
