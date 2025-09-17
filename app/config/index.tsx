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
      <Text>Arquivo de configurações.</Text>
      <Link href={"/config/user"}>IR PARA CONFIGURAÇÕES DO USUÁRIO</Link>
    </View>
  );
}
