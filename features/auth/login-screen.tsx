import { useRouter } from "expo-router";
import type { LoginFormProps } from "./components/login-form";

import { FocusAwareStatusBar } from "@/components/ui";
import * as React from "react";
import { LoginForm } from "./components/login-form";

export function LoginScreen() {
  const router = useRouter();
  // const signIn = useAuthStore.use.signIn();

  const onSubmit: LoginFormProps["onSubmit"] = (data) => {
    console.log(data);
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    router.push("/");
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
