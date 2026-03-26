/* eslint-disable react/display-name */
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import * as React from "react";
import type { PressableProps } from "react-native";
import {
  Platform,
  Pressable,
  Text as RNText,
  StyleSheet,
  View,
} from "react-native";

import { CaretDown } from "@/components/ui/icons";
import { Modal, useModal } from "./modal";

const List = Platform.OS === "web" ? FlashList : BottomSheetFlatList;

export type OptionType = { label: string; value: string | number };

type OptionsProps = {
  options: OptionType[];
  onSelect: (option: OptionType) => void;
  value?: string | number;
  testID?: string;
};

function keyExtractor(item: OptionType) {
  return `select-item-${item.value}`;
}

export function Options({
  ref,
  options,
  onSelect,
  value,
  testID,
}: OptionsProps & { ref?: React.RefObject<BottomSheetModal | null> }) {
  const height = options.length * 60 + 100;
  const snapPoints = React.useMemo(() => [height], [height]);

  const renderItem = React.useCallback(
    ({ item }: { item: OptionType }) => (
      <Option
        label={item.label}
        selected={value === item.value}
        onPress={() => onSelect(item)}
      />
    ),
    [onSelect, value],
  );

  return (
    <Modal ref={ref} index={0} snapPoints={snapPoints}>
      <List
        data={options}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={52}
        testID={testID ? `${testID}-modal` : undefined}
      />
    </Modal>
  );
}

/* ================= OPTION ITEM ================= */

const Option = React.memo(
  ({
    label,
    selected = false,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
  }) => {
    return (
      <Pressable style={styles.option} {...props}>
        <RNText style={styles.optionText}>{label}</RNText>
        {selected && <Check />}
      </Pressable>
    );
  },
);

/* ================= SELECT ================= */

export type SelectProps = {
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  options?: OptionType[];
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  testID?: string;
};

export function Select({
  label,
  value,
  error,
  options = [],
  placeholder = "Select...",
  disabled = false,
  onSelect,
  testID,
}: SelectProps) {
  const modal = useModal();

  const selectedLabel = React.useMemo(() => {
    const found = options.find((o) => o.value === value);
    return found?.label ?? placeholder;
  }, [value, options, placeholder]);

  const handleSelect = React.useCallback(
    (option: OptionType) => {
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal, onSelect],
  );

  return (
    <>
      <View style={styles.container}>
        {label && (
          <RNText style={[styles.label, error && styles.labelError]}>
            {label}
          </RNText>
        )}

        <Pressable
          style={[
            styles.input,
            disabled && styles.disabled,
            error && styles.errorBorder,
          ]}
          disabled={disabled}
          onPress={modal.present}
          testID={testID ? `${testID}-trigger` : undefined}
        >
          <RNText style={[styles.inputText, error && styles.errorText]}>
            {selectedLabel}
          </RNText>

          <CaretDown />
        </Pressable>

        {error && <RNText style={styles.error}>{error}</RNText>}
      </View>

      <Options
        ref={modal.ref}
        options={options}
        value={value}
        onSelect={handleSelect}
        testID={testID}
      />
    </>
  );
}

/* ================= ICON ================= */

function Check() {
  return <RNText style={{ fontSize: 18 }}>✔</RNText>;
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: "#555",
  },
  labelError: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    flex: 1,
    color: "#111",
  },
  disabled: {
    backgroundColor: "#eee",
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
  },
  error: {
    marginTop: 4,
    color: "red",
    fontSize: 12,
  },
  option: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  optionText: {
    fontSize: 16,
  },
});
