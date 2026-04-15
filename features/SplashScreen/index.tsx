import { useEffect } from "react";
import { Image, Platform, StyleSheet, UIManager, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// import { initApp } from '@/store/splash/splash.slice';
import { initApp } from "@/lib/store/splash/splash-slice";
import { Device, Images } from "@lib/common";

const SplashScreen = () => {
  const dispatch = useDispatch();

  const netInfo = useSelector((state: any) => state.netInfo);

  useEffect(() => {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }

    dispatch(initApp());
  }, []);

  return (
    <View style={styles.container}>
      {!Device.isAndroid && <Image style={styles.image} source={Images.Logo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: "contain",
  },
});

export default SplashScreen;
