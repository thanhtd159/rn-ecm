import { Stack } from "expo-router";

export default function PublicLayout() {
  console.log("login app");

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login" />
  );
}
