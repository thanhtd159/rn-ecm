/** @format */

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type AlignType = "top" | "center" | "bottom";

type EasingType = keyof typeof Easing | ((value: number) => number);

interface CollapsibleProps {
  align?: AlignType;
  collapsed?: boolean;
  collapsedHeight?: number;
  duration?: number;
  easing?: EasingType | string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

const ANIMATED_EASING_PREFIXES = ["easeInOut", "easeOut", "easeIn"];

const resolveEasing = (easingProp: EasingType | string) => {
  if (typeof easingProp === "function") return easingProp;

  let easingName: any = easingProp;

  let prefixMatch = ANIMATED_EASING_PREFIXES.find((prefix) =>
    easingName.startsWith(prefix),
  );

  if (prefixMatch) {
    const base = prefixMatch.replace("ease", "").toLowerCase();
    const fn = easingName.slice(prefixMatch.length);
    const easingFn = (Easing as any)[fn || "ease"];

    return (Easing as any)[base](easingFn);
  }

  const easingFn = (Easing as any)[easingName];

  if (!easingFn) {
    throw new Error(`Invalid easing type "${easingProp}"`);
  }

  return easingFn;
};

const Collapsible: React.FC<CollapsibleProps> = ({
  align = "top",
  collapsed = true,
  collapsedHeight = 0,
  duration = 300,
  easing = "easeOutCubic",
  style,
  children,
}) => {
  const [measuring, setMeasuring] = useState(false);
  const [measured, setMeasured] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [animating, setAnimating] = useState(false);

  const heightAnim = useRef(new Animated.Value(collapsedHeight)).current;
  const contentRef = useRef<View>(null);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const prevCollapsed = useRef(collapsed);

  const transitionToHeight = useCallback(
    (targetHeight: number) => {
      const easingFn = resolveEasing(easing);

      animationRef.current?.stop();

      setAnimating(true);

      const animation = Animated.timing(heightAnim, {
        toValue: targetHeight,
        duration,
        easing: easingFn,
        useNativeDriver: false,
      });

      animationRef.current = animation;

      animation.start(() => setAnimating(false));
    },
    [duration, easing, heightAnim],
  );

  const measureContent = useCallback((callback: (height: number) => void) => {
    setMeasuring(true);

    requestAnimationFrame(() => {
      contentRef.current?.measure((_x, _y, _w, h) => {
        setMeasuring(false);
        setMeasured(true);
        setContentHeight(h);
        callback(h);
      });
    });
  }, []);

  const toggleCollapsed = useCallback(
    (isCollapsed: boolean) => {
      if (isCollapsed) {
        transitionToHeight(collapsedHeight);
      } else if (!contentRef.current) {
        if (measured) {
          transitionToHeight(contentHeight);
        }
      } else {
        measureContent((h) => transitionToHeight(h));
      }
    },
    [
      collapsedHeight,
      measured,
      contentHeight,
      transitionToHeight,
      measureContent,
    ],
  );

  useEffect(() => {
    if (collapsed !== prevCollapsed.current) {
      prevCollapsed.current = collapsed;
      toggleCollapsed(collapsed);
    }
  }, [collapsed, toggleCollapsed]);

  useEffect(() => {
    if (collapsed) {
      heightAnim.setValue(collapsedHeight);
    }
  }, [collapsed, collapsedHeight, heightAnim]);

  useEffect(() => {
    return () => {
      animationRef.current?.stop();
    };
  }, []);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const newHeight = event.nativeEvent.layout.height;

      if (animating || collapsed || measuring || newHeight === contentHeight) {
        return;
      }

      heightAnim.setValue(newHeight);
      setContentHeight(newHeight);
    },
    [animating, collapsed, measuring, contentHeight, heightAnim],
  );

  const hasKnownHeight = !measuring && (measured || collapsed);

  const containerStyle: StyleProp<ViewStyle> = hasKnownHeight
    ? {
        overflow: "hidden",
        height: heightAnim,
      }
    : undefined;

  const contentStyle: StyleProp<ViewStyle> = {};

  if (measuring) {
    Object.assign(contentStyle, {
      position: "absolute",
      opacity: 0,
    });
  } else if (align === "center") {
    Object.assign(contentStyle, {
      transform: [
        {
          translateY: heightAnim.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [contentHeight / -2, 0],
          }),
        },
      ],
    });
  } else if (align === "bottom") {
    Object.assign(contentStyle, {
      transform: [
        {
          translateY: heightAnim.interpolate({
            inputRange: [0, contentHeight],
            outputRange: [-contentHeight, 0],
          }),
        },
      ],
    });
  }

  return (
    <Animated.View
      style={containerStyle}
      pointerEvents={collapsed ? "none" : "auto"}
    >
      <Animated.View
        ref={contentRef}
        style={[style, contentStyle]}
        onLayout={animating ? undefined : onLayout}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default Collapsible;
