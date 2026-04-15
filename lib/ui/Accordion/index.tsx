/** @format */

import React, { ReactNode, useEffect, useState } from "react";
import {
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewProps,
} from "react-native";
import Collapsible from "./Collapsible";

export interface AccordionProps<T = any> extends ViewProps {
  sections: T[];
  renderHeader: (section: T, index: number, isActive: boolean) => ReactNode;
  renderContent: (section: T, index: number, isActive: boolean) => ReactNode;

  onChange?: (activeSection: number | false) => void;

  /** controlled */
  activeSection?: number | false;

  /** uncontrolled */
  initiallyActiveSection?: number;

  underlayColor?: string;

  touchableComponent?: React.ComponentType<TouchableHighlightProps>;
  touchableProps?: TouchableHighlightProps;

  /** forward xuống Collapsible */
  collapsibleProps?: React.ComponentProps<typeof Collapsible>;
}

const Accordion = <T,>({
  sections,
  renderHeader,
  renderContent,
  onChange,
  activeSection: activeSectionProp,
  initiallyActiveSection,
  underlayColor = "black",
  touchableComponent: Touchable = TouchableHighlight,
  touchableProps,
  collapsibleProps,
  ...viewProps
}: AccordionProps<T>) => {
  const isControlled = activeSectionProp !== undefined;

  const [internalActive, setInternalActive] = useState<number | false>(
    initiallyActiveSection ?? false,
  );

  const activeSection = isControlled ? activeSectionProp : internalActive;

  useEffect(() => {
    if (isControlled) return;
    if (initiallyActiveSection !== undefined) {
      setInternalActive(initiallyActiveSection);
    }
  }, [initiallyActiveSection, isControlled]);

  const toggleSection = (index: number) => {
    const newActive = activeSection === index ? false : index;

    if (!isControlled) {
      setInternalActive(newActive);
    }

    onChange?.(newActive);
  };

  return (
    <View {...viewProps}>
      {sections.map((section, index) => {
        const isActive = activeSection === index;

        return (
          <View key={index}>
            <Touchable
              activeOpacity={0.8}
              underlayColor={underlayColor}
              onPress={() => toggleSection(index)}
              {...touchableProps}
            >
              {renderHeader(section, index, isActive)}
            </Touchable>

            <Collapsible collapsed={!isActive} {...collapsibleProps}>
              {renderContent(section, index, isActive)}
            </Collapsible>
          </View>
        );
      })}
    </View>
  );
};

export default Accordion;
