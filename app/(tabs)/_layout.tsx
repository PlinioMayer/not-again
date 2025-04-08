import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { MD3LightTheme } from "react-native-paper";

const TabsLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    <Tabs.Screen
      name="objetivos"
      options={{
        title: "Objetivos",
        tabBarActiveTintColor: MD3LightTheme.colors.primary,
        tabBarIcon: ({ color }: { color: string }) => (
          <MaterialCommunityIcons size={28} name="flag-variant" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="plinios"
      options={{
        title: "Plínios",
        tabBarActiveTintColor: MD3LightTheme.colors.primary,
        tabBarIcon: ({ color }: { color: string }) => (
          <MaterialCommunityIcons size={28} name="seal" color={color} />
        ),
      }}
    />
  </Tabs>
);

export default TabsLayout;
