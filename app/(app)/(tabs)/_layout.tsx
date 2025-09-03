import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";


export default function TabsLayout() {
  const colors = useThemeColors();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: { backgroundColor: colors.background, borderTopColor: colors.border },
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerTitleStyle: { color: colors.text },
        headerShown: false,
      }}>
        <Tabs.Screen
        name="index"
        options={{ title: "Index",
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" color={color} size={size} />
            ),
         }}
      />
       <Tabs.Screen
        name="operations"
        options={{ title: "Operations",
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="auto-fix-high" color={color} size={size} />
            ),
         }}
         />
          <Tabs.Screen
        name="profile"
        options={{ title: "Profile",
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="person" color={color} size={size} />
            ),
         }}
         />

       
        </Tabs>
    );
}
