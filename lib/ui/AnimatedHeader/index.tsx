/** @format */

import React from "react";
import { View } from "react-native";
// import { AdMobBanner } from 'expo-ads-admob';

import { Config } from "@/lib/common";
import styles from "./styles";

export interface AnimatedHeaderProps {
  adSize?: string;
  style?: object;
  scrollY?: any;
  hideIcon?: boolean;
  label?: string;
  navigation?: any;
  [key: string]: any;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  adSize = "banner",
  style,
}) => {
  if (!Config.showAdmobAds) {
    return <View />;
  }

  return (
    <View style={[styles.body, style]}>
      {/* <AdMobBanner
        ref={component => (this._root = component)}
        adSize={adSize}
        testDevices={
          DEV_ENV ? [AdMobBanner.simulatorId] : [Config.AdMob.deviceID]
        }
        adUnitID={Config.AdMob.banner}
      /> */}
    </View>
  );
};

export default AnimatedHeader;
