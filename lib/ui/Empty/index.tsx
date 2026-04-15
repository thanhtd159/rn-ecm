/** @format */

import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Color } from "@lib/common";

export interface EmptyProps {
  /** Message to display when there is no content */
  text?: string;
}

const Empty: React.FC<EmptyProps> = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {
    color: Color.lightText,
  },
});

export default Empty;
