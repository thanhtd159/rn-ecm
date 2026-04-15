/** @format */

import Icon from "@expo/vector-icons/SimpleLineIcons";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modalbox";

import { withTheme } from "@lib/common";
import styles from "./styles";

/** ===== Types ===== */

export interface ThemeType {
  colors: {
    background: string;
    text: string;
  };
}

export interface ModalBoxRef {
  openModal: () => void;
  closeModal: () => void;
}

export interface ModalBoxProps {
  children?: React.ReactNode;
  css?: any;
  type?: string;
  theme: ThemeType; // bắt buộc để tránh undefined
}

/** ===== Component ===== */

const ModalBoxComponent = forwardRef<ModalBoxRef, ModalBoxProps>(
  (props, ref) => {
    const { type, css, children, theme } = props;
    const { background, text } = theme.colors;

    const modalRef = useRef<Modal | null>(null);

    useImperativeHandle(ref, () => ({
      openModal: () => modalRef.current?.open(),
      closeModal: () => modalRef.current?.close(),
    }));

    return (
      <Modal
        ref={modalRef}
        useNativeDriver
        animationDuration={100}
        backdropOpacity={Platform.OS === "android" ? 0.9 : 0.5}
        position="top"
        style={[
          type !== undefined ? styles.modalReadlater : styles.modalBoxWrap,
          css,
        ]}
      >
        <View style={[styles.wrap, { backgroundColor: background }]}>
          {children}
        </View>

        <TouchableOpacity
          style={styles.iconZoom}
          onPress={() => modalRef.current?.close()}
        >
          <Icon style={styles.textClose} name="close" size={22} color={text} />
        </TouchableOpacity>
      </Modal>
    );
  },
);

ModalBoxComponent.displayName = "ModalBox";

/** ===== Fix type HOC ===== */

const ModalBox = withTheme(
  ModalBoxComponent as React.ComponentType<any>,
) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Omit<ModalBoxProps, "theme">> &
    React.RefAttributes<ModalBoxRef>
>;

export default ModalBox;
