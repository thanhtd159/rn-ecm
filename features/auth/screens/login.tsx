import { Text, View } from "react-native";
import { LoginForm } from "../components/login-form";

export const LoginScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>
      <LoginForm />
    </View>
  );
};
