import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type AuthMode = "login" | "register";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login");

  const switchToLogin = () => setMode("login");
  const switchToRegister = () => setMode("register");

  return (
    <AuthLayout
      title={mode === "login" ? "Welcome Back" : "Join FarmDirect"}
      subtitle={
        mode === "login"
          ? "Sign in to access your account and connect with farmers"
          : "Create your account and start connecting with local farmers"
      }
    >
      {mode === "login" ? (
        <LoginForm onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterForm onSwitchToLogin={switchToLogin} />
      )}
    </AuthLayout>
  );
}
