import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";

export default function PrivateLayout() {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/(public)/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
