"use client";

import { ThemeSwitcher } from "@/_components/theme/theme-switcher";
import { Button } from "@/_components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ToastPage() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex gap-4">
        <ThemeSwitcher />
      </div>
      <div className="flex gap-4">
        <Button
          className="bg-green-500 hover:bg-green-400"
          onClick={() =>
            toast({
              title: "Sucesso",
              description: "Menssagem do toast de sucesso",
              variant: "default",
            })
          }
        >
          Toast Success
        </Button>
        <Button
          className="bg-yellow-500 hover:bg-yellow-400"
          onClick={() =>
            toast({
              title: "Alerta",
              description: "Menssagem do toast de alerta",
              variant: "warning",
            })
          }
        >
          Toast Warning
        </Button>
        <Button
          className="bg-red-500 hover:bg-red-400"
          onClick={() =>
            toast({
              title: "Erro",
              description: "Menssagem do toast de erro",
              variant: "error",
            })
          }
        >
          Toast Error
        </Button>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col space-y-4 items-center">
          <Button variant="default" size="default">
            default
          </Button>
          <Button variant="default" size="sm">
            default
          </Button>
          <Button variant="default" size="lg">
            default
          </Button>
          <Button variant="default" size="icon">
            default
          </Button>
        </div>
        <div className="flex flex-col space-y-4 items-center">
          <Button variant="secondary" size="default">
            secondary
          </Button>
          <Button variant="secondary" size="sm">
            secondary
          </Button>
          <Button variant="secondary" size="lg">
            secondary
          </Button>
          <Button variant="secondary" size="icon">
            secondary
          </Button>
        </div>
        <div className="flex flex-col space-y-4 items-center">
          <Button variant="ghost" size="default">
            ghost
          </Button>
          <Button variant="ghost" size="sm">
            ghost
          </Button>
          <Button variant="ghost" size="lg">
            ghost
          </Button>
          <Button variant="ghost" size="icon">
            ghost
          </Button>
        </div>
      </div>
    </div>
  );
}
