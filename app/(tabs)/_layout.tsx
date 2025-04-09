import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

const TabsLayout = () => {
  const theme = useTheme();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="objetivos"
        options={{
          title: "Objetivos",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons
              size={28}
              name="flag-variant"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="plinios"
        options={{
          title: "Plínios",
          tabBarActiveTintColor: theme.colors.primary,
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons size={28} name="seal" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
