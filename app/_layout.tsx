import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="areamedica/index" />
        <Stack.Screen name="areamedica/[id]" />
        <Stack.Screen name="config/index" />
      </Stack>
      <Toast />
    </>
  );
}
