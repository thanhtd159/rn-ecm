/** @format */

import React, { FC, ReactNode, useCallback, useRef } from "react";
import { Platform } from "react-native";
import SideMenu from "react-native-drawer";

import { selectSideMenu } from "@/lib/store/settings/setting-selector";
import { toggleSideMenu } from "@/lib/store/settings/setting-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";

import { Color } from "@lib/common";
import Drawer from "@lib/ui/Drawer";

interface MenuScaleProps {
  goToScreen?: (route: string) => void;
  routes: ReactNode;
}

/**
 * MenuScale only supports iOS scaling effect
 */
const MenuScale: FC<MenuScaleProps> = ({ goToScreen, routes }) => {
  const drawerRef = useRef<SideMenu | null>(null);
  const dispatch = useAppDispatch();
  const isOpenMenu = useAppSelector(selectSideMenu);

  const handleCloseMenu = useCallback(() => {
    dispatch(toggleSideMenu(false));
  }, [dispatch]);

  const commonProps = {
    ref: drawerRef,
    open: isOpenMenu,
    onClose: handleCloseMenu,
    tapToClose: true,
    useInteractionManager: true,
  };

  if (Platform.OS === "android") {
    return (
      <SideMenu
        {...commonProps}
        type="overlay"
        panCloseMask={0.2}
        openDrawerOffset={0.2}
        styles={{
          drawer: { backgroundColor: Color.primary },
          main: { paddingLeft: 0, paddingRight: 0 },
        }}
        content={
          <Drawer
            goToScreen={(route, params, isPush) => {
              goToScreen?.(route);
            }}
          />
        }
      >
        {routes}
      </SideMenu>
    );
  }

  return (
    <SideMenu
      {...commonProps}
      type="static"
      // isScale
      captureGestures
      panCloseMask={0.25}
      openDrawerOffset={0.25}
      styles={{
        drawer: { backgroundColor: Color.primary }, // ✅ đúng chỗ
      }}
      content={
        <Drawer
          backgroundMenu={Color.primary}
          colorTextMenu="#FFF"
          goToScreen={(route, params, isPush) => {
            goToScreen?.(route);
          }}
        />
      }
    >
      {routes}
    </SideMenu>
  );
};

export default MenuScale;
