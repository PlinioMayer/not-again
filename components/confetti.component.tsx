import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const colors = [
  "#D4AF37",
  "#C0C0C0",
  "#CD7F32",
  "#FFD700",
  "#E5E4E2",
  "#8C7853",
  "#DAA520",
  "#B87333",
];

const ConfettiPiece = () => {
  const rotation = useSharedValue(Math.random() * 90);
  const bottom = useSharedValue(100);
  const opacity = useSharedValue<number>(1);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;

  const animatedStyle = useAnimatedStyle(() => ({
    bottom: `${bottom.value}%`,
    opacity: opacity.value,
    left: `${left}%`,
    position: "absolute",
    width: 5,
    height: 10,
    borderRadius: 5,
    backgroundColor: color,
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    opacity.value = withTiming(0, {
      duration: 3000,
      easing: Easing.out(Easing.ease),
    });

    bottom.value = withDelay(
      Math.random() * 1000,
      withTiming(0, {
        duration: Math.random() * 5000 + 2000,
        easing: Easing.out(Easing.ease),
      }),
    );

    rotation.value = withTiming(1080 + rotation.value, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });
  }, [opacity, bottom, rotation]);

  return <Animated.View style={animatedStyle} />;
};

export const ConfettiComponent = ({
  show = false,
  style,
}: {
  show?: boolean;
  style?: ViewStyle;
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const animate = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }, [setShowConfetti]);

  useEffect(() => {
    if (show) {
      animate();
    }
  }, [show, animate]);

  useEffect(() => {});

  return (
    <View style={[styles.container, style]}>
      {showConfetti &&
        Array.from({ length: 200 }, (_, index) => (
          <ConfettiPiece key={index} />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
