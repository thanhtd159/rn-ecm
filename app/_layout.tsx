import { store } from "@/lib/store/store";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import AppWrapper from "./app-wrapper";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <AppWrapper />
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
