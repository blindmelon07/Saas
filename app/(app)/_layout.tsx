import { useSession } from "@/context/AuthContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
const AppLayout = () => {
  const {session, isLoading} = useSession();
  const colors = useThemeColors();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-2 text-gray-800 dark:text-white-200">Loading...</Text>
      </View>
    );
  }
  if (!session) {
    return <Redirect href="/signIn" />;
  }
  return <Stack screenOptions={{
    headerStyle: { backgroundColor: colors.card },
    headerTintColor: colors.text,
    contentStyle: { backgroundColor: colors.background },
    headerTitleStyle: { color: colors.text},
    
  }}>
    <Stack.Screen name="(tabs)" 
    options={{ headerShown: false }}
     />
     <Stack.Screen name="restore" 
    options={{ headerTitle: "Restore Images" }}
     />
     <Stack.Screen name="generative-fill" 
    options={{ headerTitle: "Generate  Images" }}
     />
        <Stack.Screen name="recolor" 
    options={{ headerTitle: "Recolor  Images" }}
     />
     <Stack.Screen name="remove" 
    options={{ headerTitle: "Remove  Hair" }}
     />
    </Stack>;
};

export default AppLayout;
