/** @format */

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  useDrawerStatus,
} from "@react-navigation/drawer";
import React, { useEffect } from "react";

import { selectSideMenu } from "@/lib/store/settings/setting-selector";
import { toggleSideMenu } from "@/lib/store/side-menu/side-menu-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import Drawer from "@lib/ui/Drawer";

interface Theme {
  colors: {
    text: string;
    background: string;
  };
}

interface MenuOverlayProps extends DrawerContentComponentProps {
  goToScreen?: (route: string) => void;
  theme?: Theme;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({
  navigation,
  goToScreen,
  theme: { colors: { text, background } } = {
    colors: { text: "#000", background: "#fff" },
  },
}) => {
  const dispatch = useAppDispatch();
  const isOpenMenu = useAppSelector(selectSideMenu);

  // 🔥 Sync Redux -> Drawer
  useEffect(() => {
    if (isOpenMenu) {
      navigation.openDrawer();
    } else {
      navigation.closeDrawer();
    }
  }, [isOpenMenu, navigation]);

  // 🔥 Sync Drawer -> Redux
  const isDrawerOpen = useDrawerStatus() === "open";

  useEffect(() => {
    if (!isDrawerOpen) {
      dispatch(toggleSideMenu(false));
    }
  }, [isDrawerOpen, dispatch]);

  const handleNavigate = (route: string) => {
    goToScreen?.(route);
    navigation.navigate(route as never);
    navigation.closeDrawer();
    dispatch(toggleSideMenu(false));
  };

  return (
    <DrawerContentScrollView>
      <Drawer
        colorTextMenu={text}
        backgroundMenu={background}
        goToScreen={(route) => handleNavigate(route)}
      />
    </DrawerContentScrollView>
  );
};

export default MenuOverlay;
