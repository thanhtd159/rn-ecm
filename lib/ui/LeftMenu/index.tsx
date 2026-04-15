import React from 'react';
import {View} from 'react-native';
import styles from './style';

export type LeftMenuProps = {};

export default function LeftMenu(props: LeftMenuProps) {
  return <View style={(styles as any).container} />;
}
