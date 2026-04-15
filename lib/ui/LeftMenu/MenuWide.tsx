/** @format */

import React, { FC, ReactNode, useCallback, useRef } from "react";
import SideMenu from "react-native-drawer";

import Drawer from "@lib/ui/Drawer";

import { selectSideMenu } from "@/lib/store/settings/setting-selector";
import { toggleSideMenu } from "@/lib/store/settings/setting-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";

interface MenuWideProps {
  goToScreen?: (route: string) => void;
  routes: ReactNode;
}

const MenuWide: FC<MenuWideProps> = ({ goToScreen, routes }) => {
  const drawerRef = useRef<any>(null); // lib không có type chuẩn
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
      panCloseMask={0.2}
      panThreshold={0.2}
      openDrawerOffset={0.2}
      useInteractionManager
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

export default MenuWide;
