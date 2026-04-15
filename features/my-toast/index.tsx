/** @format */

import { isObject } from "lodash";
import React, { useCallback, useEffect } from "react";
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { showToast } from "@/lib/store/my-toast/my-toast-action";
import { removeToast } from "@/lib/store/my-toast/my-toast-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/useRedux";
import { Constants, Styles } from "@lib/common";
import { EventEmitter } from "@lib/Omni";

const MyToast: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.toast);

  // Listen event emitter
  useEffect(() => {
    const listener = EventEmitter.addListener(
      Constants.EmitCode.Toast,
      (msg: string, duration?: number) => {
        dispatch(showToast(msg, duration));
      },
    );

    return () => {
      listener.remove();
    };
  }, [dispatch]);

  // animation on update
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [toast.list]);

  const handleRemove = useCallback(
    (key: number | string) => {
      dispatch(removeToast({ key }));
    },
    [dispatch],
  );

  const renderToast = useCallback(
    (item: { key: number | string; msg: string }) => {
      if (!item?.msg || isObject(item.msg)) return null;

      return (
        <TouchableOpacity
          key={item.key}
          style={styles.textWrap}
          onPress={() => handleRemove(item.key)}
        >
          <Text style={styles.text}>{item.msg}</Text>
        </TouchableOpacity>
      );
    },
    [handleRemove],
  );

  return <View style={styles.container}>{toast.list.map(renderToast)}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: Styles.height / 10, // padding bottom
    left: Styles.width / 20,
    right: Styles.width / 20, // padding horizontal
    alignItems: "center",
    zIndex: 9999,
  },
  textWrap: {
    backgroundColor: "rgba(60,60,60,0.9)",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 5,
  },
  text: {
    color: "#FFFFFF",
  },
});

export default MyToast;
