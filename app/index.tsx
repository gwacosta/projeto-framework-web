import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={"/(auth)/login"}>LOGIN</Link>
      <Link href={"/(auth)/signup"}>SIGNUP</Link>
    </View>
  );
}
