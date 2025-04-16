import { PlinioBackComponent, PlinioCardComponent } from "@/components";
import { Plinio } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSequence,
} from "react-native-reanimated";

const isFront = (value: number): boolean => {
  return (
    value < 90 ||
    (value > 270 && value < 450) ||
    (value > 630 && value < 810) ||
    (value > 990 && value <= 1080)
  );
};

type ShowPlinioConfig = {
  title?: string;
  animated?: boolean;
  callback?: () => void;
};

export const PlinioContext = createContext<{
  show: (plinio: Plinio, config?: ShowPlinioConfig) => void;
  clear: () => void;
}>({
  show: () => {
    throw new Error("PlinioContext.show não inicializado");
  },
  clear: () => {
    throw new Error("PlinioContext.clear não inicializado");
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
  animationContainer: {
    flex: 1,
    width: "80%",
    position: "relative",
  },
  plinioCard: {
    width: "80%",
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
    color: "white",
    textAlign: "center",
  },
});

export const PlinioProvider = ({ children }: { children: ReactNode }) => {
  const transform = useSharedValue(0);
  const [title, setTitle] = useState<string | undefined>();
  const [animated, setAnimated] = useState<boolean>(false);
  const [plinio, setPlinio] = useState<Plinio | undefined>();
  const [callback, setCallback] = useState<() => void>();
  const show = useCallback(
    (plinio: Plinio, config?: ShowPlinioConfig) => {
      setCallback(() => config?.callback);
      setAnimated(!!config?.animated);
      setTitle(config?.title);
      setPlinio(plinio);
    },
    [setPlinio, setCallback],
  );
  const clear = useCallback(() => {
    setPlinio(undefined);
    if (callback) {
      callback();
    }
  }, [setPlinio, callback]);

  const animatedStyleFront = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: [{ rotateY: transform.value + "deg" }],
      opacity: isFront(transform.value) ? 1 : 0,
    };
  });

  const animatedStyleBack = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      transform: [{ rotateY: transform.value + 180 + "deg" }],
      opacity: isFront(transform.value) ? 0 : 1,
    };
  });

  useEffect(() => {
    if (!animated) {
      return;
    }

    if (plinio) {
      transform.value = withSequence(
        withTiming(1080, {
          duration: 2500,
          easing: Easing.out(Easing.ease),
        }),
      );
    } else {
      transform.value = 0;
    }
  }, [plinio, transform, animated]);

  return (
    <PlinioContext.Provider value={{ show, clear }}>
      <Portal>
        <Modal
          visible={!!plinio}
          onDismiss={clear}
          contentContainerStyle={styles.container}
        >
          {title && (
            <Text style={styles.title} variant="titleLarge">
              {title}
            </Text>
          )}
          <View style={styles.animationContainer}>
            <Animated.View style={[animatedStyleFront]}>
              <PlinioCardComponent plinio={plinio} />
            </Animated.View>

            <Animated.View style={[animatedStyleBack]}>
              <PlinioBackComponent />
            </Animated.View>
          </View>

          <IconButton
            icon="close-circle-outline"
            onPress={clear}
            iconColor="black"
            size={30}
          />
        </Modal>
      </Portal>
      {children}
    </PlinioContext.Provider>
  );
};

export const usePlinio = () => useContext(PlinioContext);
