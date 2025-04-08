import { PaperProvider, MD3LightTheme } from "react-native-paper";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AxiosProvider } from "@/contexts";

export const RootLayout = () => {
  return (
    <AxiosProvider>
      <PaperProvider>
        <Tabs screenOptions={{ headerShown: false }}>
          <Tabs.Screen
            name="objetivos"
            options={{
              title: "Objetivos",
              tabBarActiveTintColor: MD3LightTheme.colors.primary,
              tabBarIcon: ({ color }: { color: string }) => (
                <FontAwesome size={28} name="home" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="plinios"
            options={{
              title: "Plínios",
              tabBarActiveTintColor: MD3LightTheme.colors.primary,
              tabBarIcon: ({ color }: { color: string }) => (
                <MaterialCommunityIcons
                  size={28}
                  name="bitcoin"
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </PaperProvider>
    </AxiosProvider>
  );
};

export default RootLayout;
