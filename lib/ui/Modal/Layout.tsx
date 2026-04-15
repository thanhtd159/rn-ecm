/** @format */

import React, { useEffect, useRef } from "react";
import { View } from "react-native";

// import {ModalBox} from './index';
import { Config, Events } from "@lib/common";

import ModalBox from ".";
import ItemLayout from "./ItemLayout";
import styles from "./styles";

const Layout = () => {
  const modal = useRef(null);

  const open = () => {
    // modal.current && modal.current?.openModal && modal.current.openModal();
  };

  const close = () => {
    // modal.current && modal.current?.closeModal && modal.current.closeModal();
  };

  useEffect(() => {
    Events.onOpenModalLayout(open);
  }, []);

  return (
    <ModalBox ref={modal}>
      <View style={styles.layoutBox}>
        {Config.layouts.map((item, index) => {
          return (
            <ItemLayout
              key={index}
              close={close}
              layout={item.layout}
              image={item.image}
              text={item.text}
            />
          );
        })}
      </View>
    </ModalBox>
  );
};

export default Layout;
