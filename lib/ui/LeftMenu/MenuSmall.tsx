/** @format */

// import SideMenu from "@custom/react-native-drawer";
import React, { FC, ReactNode, useCallback, useRef } from "react";
import SideMenu from "react-native-drawer";

import Drawer from "@lib/ui/Drawer";

import { selectSideMenu } from "@/lib/store/settings/setting-selector";
import { toggleSideMenu } from "@/lib/store/settings/setting-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";

interface MenuSmallProps {
  goToScreen?: (route: string) => void;
  routes: ReactNode;
}

const MenuSmall: FC<MenuSmallProps> = ({ goToScreen, routes }) => {
  const drawerRef = useRef<any>(null); // lib custom thường không có type chuẩn
  const dispatch = useAppDispatch();
  const isOpenMenu = useAppSelector(selectSideMenu);

  const handleCloseMenu = useCallback(() => {
    dispatch(toggleSideMenu(false));
  }, [dispatch]);

  return (
    <SideMenu
      ref={drawerRef}
      type="static"
      open={isOpenMenu}
      onClose={handleCloseMenu}
      tapToClose
      panCloseMask={0.6}
      panThreshold={0.6}
      openDrawerOffset={0.6}
      useInteractionManager
      styles={{
        drawer: { backgroundColor: "#34BC99" }, // ✅ fix đúng chỗ
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
};

export default MenuSmall;
