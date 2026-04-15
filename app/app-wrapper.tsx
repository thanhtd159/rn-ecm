import { Stack, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StatusBar, View } from "react-native";
import { useSelector } from "react-redux";

import { Config, Device, Styles, ThemeProvider, themes } from "@lib/common";
import ModalReview from "@lib/ui/Modal/Review";

import {
  selectIsIntroFinished,
  selectUser,
} from "@/features/auth/store/auth-selector";
import MyToast from "@/features/my-toast";
import { useInitApp } from "@/lib/hooks/use-app-init";
import { selectLoading } from "@/lib/store/app-init/app-init-selector";
import { selectInitializing } from "@/lib/store/layout/layout-selector";
import { selectIsDarkTheme } from "@/lib/store/settings/setting-selector";
import AppIntro from "@/lib/ui/AppIntro";

// type RootState = any; // 👉 nên replace bằng type chuẩn của bạn

const AppWrapper = () => {
  const router = useRouter();

  const isDarkTheme = useSelector(selectIsDarkTheme);
  const introStatus = useSelector(selectIsIntroFinished);
  const initializing = useSelector(selectInitializing);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const theme = useMemo(
    () => (isDarkTheme ? themes.dark : themes.default),
    [isDarkTheme],
  );

  useInitApp();

  const goToScreen = (routeName: string, params?: any) => {
    try {
      if (!routeName) return;

      router.push({
        pathname: routeName,
        params,
      });
    } catch (e) {
      console.log("Navigation error", e);
    }
  };

  // Intro
  console.log("Intro: ", introStatus);

  if (!introStatus) {
    return <AppIntro />;
  }

  // Splash
  // console.log("Splash: ", loading, initializing);

  // if (loading || initializing) {
  //   return <SplashScreen />;
  // }

  console.log("ThemeProvider: ", loading, initializing);
  return (
    <ThemeProvider theme={theme}>
      <View style={[Styles.app, { backgroundColor: theme.colors.background }]}>
        <StatusBar
          barStyle={isDarkTheme ? "light-content" : "dark-content"}
          animated
          hidden={Device.isIphoneX ? false : !Config.showStatusBar}
        />

        <MyToast />

        {/* 🔥 AUTH GUARD */}
        <Stack screenOptions={{ headerShown: false }}>
          {!user ? (
            // 👉 chưa login → chỉ cho vào public
            <Stack.Screen name="(public)" />
          ) : (
            // 👉 đã login → vào private + tabs
            <>
              <Stack.Screen name="(private)" />
              <Stack.Screen name="(tabs)" />
            </>
          )}
        </Stack>

        <ModalReview />
      </View>
    </ThemeProvider>
  );
};

export default AppWrapper;
