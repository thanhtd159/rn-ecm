/** @format */

import { Config, Tools } from "@lib/common";
import { Text } from "@lib/ui";
import React, { useEffect, useState } from "react";
import { I18nManager, Image, ScrollView, View } from "react-native";
import { DrawerButton } from "../DrawerButton";
// import {useAppSelector} from '@redux/hooks';
import { RootState } from "@/lib/store/rootReducer";
import { useAppSelector } from "@/lib/store/useRedux";
import styles from "./styles";

const getButtonList = (user: any) => {
  if (user) {
    return [...Config.menu.listMenu, ...Config.menu.listMenuLogged];
  }
  return [...Config.menu.listMenu, ...Config.menu.listMenuUnlogged];
};

const DrawerDefault = ({ goToScreen }: { goToScreen: Function }) => {
  const userProfile = useAppSelector((state: RootState) => state.auth);
  const user = userProfile.user;
  const [buttonList, setButtonList] = useState(() => getButtonList(user));

  useEffect(() => {
    setButtonList(getButtonList(userProfile.user));
  }, [userProfile.user]);

  const handlePress = (item: any) => {
    goToScreen(item.routeName, item.params, item.isReset);
  };

  const avatar = Tools.getAvatar(user);
  const name = Tools.getName(user);

  return (
    <View style={styles.container}>
      {/* Styles.Common.ColumnCenter */}
      <View style={[styles.avatarBackground]}>
        <Image
          source={avatar}
          style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.fullName}>{name.replace(/&amp;/g, "&")}</Text>
          <Text style={styles.email}>{user ? user["username"] : ""}</Text>
        </View>
      </View>
      <ScrollView>
        {buttonList.map((item, index) => (
          <DrawerButton
            onPress={() => handlePress(item)}
            key={index}
            {...item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default DrawerDefault;
