import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1a237e" />
      </View>
    );
  }

  return (<Stack screenOptions={{ headerShown: false }}>
    <Stack.Protected guard={isLoggedIn}>
      <Stack.Screen name="projects/index" />
    </Stack.Protected>
    <Stack.Protected guard={!isLoggedIn}>
      <Stack.Screen name="index" />
    </Stack.Protected>
  </Stack>);
}
