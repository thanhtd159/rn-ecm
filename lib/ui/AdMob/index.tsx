/** @format */

import React from "react";
import { View } from "react-native";
// import { AdMobBanner } from 'expo-ads-admob';

import { Config } from "@/lib/common";
import styles from "./styles";

export interface AdMobProps {
  adSize?: string;
  style?: object;
}

const AdMob: React.FC<AdMobProps> = ({ adSize = "banner", style }) => {
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

export default AdMob;
