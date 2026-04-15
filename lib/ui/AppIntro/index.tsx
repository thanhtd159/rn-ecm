/** @format */

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { JSX, useCallback } from "react";
import { I18nManager, ListRenderItemInfo, Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useDispatch } from "react-redux";

import { finishIntro } from "@/features/auth/store/auth.slice";
import { Config } from "@lib/common";
import styles from "./styles";

interface IntroItem {
  title: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
  colors: string[];
}
export type SliderRenderItem = ({
  item,
  dimensions,
}: {
  item: IntroItem;
  dimensions: { width: number; height: number };
}) => JSX.Element;

type RenderItemProps = ListRenderItemInfo<IntroItem> & {
  dimensions: {
    width: number;
    height: number;
  };
};

// const renderItem = ({ item, dimensions }: RenderItemProps) => {
//   return (
//     <View style={{ width: dimensions.width }}>
//       <Text>{item.title}</Text>
//     </View>
//   );
// };

const AppIntro: React.FC = () => {
  const dispatch = useDispatch();

  const handleDone = useCallback(() => {
    dispatch(finishIntro());
  }, [dispatch]);

  const renderItem = useCallback(({ item, dimensions }: RenderItemProps) => {
    const { width, height } = dimensions;

    return (
      <LinearGradient
        style={[
          styles.mainContent,
          {
            width,
            height,
          },
        ]}
        colors={[item.colors[0], item.colors[1]]}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0.1, y: 1 }}
      >
        <Ionicons
          style={{ backgroundColor: "transparent" }}
          name={item.icon}
          size={200}
          color="white"
        />

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </LinearGradient>
    );
  }, []);

  const renderNextButton = useCallback(() => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name={
            I18nManager.isRTL ? "arrow-back-outline" : "arrow-forward-outline"
          }
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }, []);

  const renderDoneButton = useCallback(() => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  }, []);

  return (
    <AppIntroSlider<IntroItem>
      data={Config.intro as IntroItem[]}
      renderItem={renderItem as any}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      onDone={handleDone}
    />
  );
};

export default AppIntro;
