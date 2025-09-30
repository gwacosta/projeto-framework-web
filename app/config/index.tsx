// Importação do Link do expo-router para navegação
import { Link } from "expo-router";
// Importação de componentes nativos do React Native
import { Text, View } from "react-native";

/**
 * Tela de Configurações
 * Página principal para acesso às configurações do sistema
 * TODO: Implementar funcionalidades de configuração
 */
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Texto informativo sobre a página */}
      <Text>Arquivo de configurações.</Text>
      {/* Link para configurações específicas do usuário - TODO: implementar app/config/user.tsx */}
      <Link href="/config">IR PARA CONFIGURAÇÕES DO USUÁRIO</Link>
    </View>
  );
}
