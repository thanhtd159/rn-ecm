/** @format */

import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface DrawerButtonProps {
  title?: string;
  label?: string;
  icon?: any;
  onPress?: () => void;
  [key: string]: any;
}

export const DrawerButton: React.FC<DrawerButtonProps> = ({
  title,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title || label || ''}</Text>
  </TouchableOpacity>
);

export const DrawerButtonChild: React.FC<DrawerButtonProps> = ({
  title,
  label,
  onPress,
}) => (
  <TouchableOpacity style={[styles.button, styles.child]} onPress={onPress}>
    <Text style={styles.text}>{title || label || ''}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {paddingVertical: 14, paddingHorizontal: 16},
  child: {paddingLeft: 32},
  text: {fontSize: 14, color: '#333'},
});

export default DrawerButton;
