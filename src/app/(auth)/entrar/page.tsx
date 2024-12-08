"use client";

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";
import { useState } from "react";

type AuthForm = "login" | "register" | "forgotPassword";

export default function LoginPage() {
  const [currentForm, setCurrentForm] = useState<AuthForm>("login");

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold text-center">Autenticação</h1>
      {currentForm === "login" && (
        <LoginForm
          onRegister={() => setCurrentForm("register")}
          onForgotPassword={() => setCurrentForm("forgotPassword")}
        />
      )}
      {currentForm === "register" && (
        <RegisterForm onLogin={() => setCurrentForm("login")} />
      )}
      {currentForm === "forgotPassword" && (
        <ForgotPasswordForm onLogin={() => setCurrentForm("login")} />
      )}
    </div>
  );
}
