import type { LoginFormProps } from "../components/login-form";

import { useAppDispatch } from "@/lib/store/useRedux";
import { FocusAwareStatusBar } from "@lib/ui";
import { useRouter } from "expo-router";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoginForm } from "../components/login-form";
import { loginUser } from "../store/auth-action";
import { selectIsSuccess } from "../store/auth-selector";

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isSuccess = useSelector(selectIsSuccess);

  useEffect(() => {
    if (isSuccess) {
      router.replace("/home");
    }
  }, [isSuccess]);

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
