import type { LoginFormProps } from "../components/login-form";

import { useAppDispatch } from "@/lib/store/useRedux";
import { FocusAwareStatusBar } from "@lib/ui";
import * as React from "react";
import { LoginForm } from "../components/login-form";
import { loginUser } from "../store/net-info-action";

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const onSubmit: LoginFormProps["onSubmit"] = (data) => {
    console.log(data);
    dispatch(loginUser({ username: data.email, password: data.password }));
    // router.push("/");
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}
