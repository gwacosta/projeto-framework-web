// Importação do Stack do expo-router para gerenciar navegação entre telas
import { Stack } from "expo-router";
// Importação de componentes nativos do React Native
import { ActivityIndicator, View } from "react-native";
// Importação do componente Toast para exibir notificações - biblioteca externa
import Toast from "react-native-toast-message";
// Importação do hook customizado de autenticação (caminho: hooks/useAuth.ts)
import { useAuth } from "../hooks/useAuth";

/**
 * Componente principal de layout da aplicação
 * Define a estrutura de navegação e gerencia o estado de carregamento global
 */
export default function RootLayout() {
  // Obtém o estado de carregamento do hook de autenticação
  const { isLoading } = useAuth();

  // Exibe um indicador de carregamento enquanto verifica o estado de autenticação
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <>
      {/* Configuração da pilha de navegação sem header */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tela inicial/home (app/index.tsx) */}
        <Stack.Screen name="index" />
        {/* Tela de login (app/(auth)/login.tsx) */}
        <Stack.Screen name="(auth)/login" />
        {/* Tela de cadastro (app/(auth)/signup.tsx) */}
        <Stack.Screen name="(auth)/signup" />
        {/* Tela principal da área médica (app/areamedica/index.tsx) */}
        <Stack.Screen name="areamedica/index" />
        {/* Tela de cadastro de paciente (app/areamedica/cadastro-paciente.tsx) */}
        <Stack.Screen name="areamedica/cadastro-paciente" />
        {/* Tela de cadastro de funcionário (app/areamedica/cadastro-funcionario.tsx) */}
        <Stack.Screen name="areamedica/cadastro-funcionario" />
        {/* Tela de cadastro de atendimento (app/areamedica/cadastro-atendimento.tsx) */}
        <Stack.Screen name="areamedica/cadastro-atendimento" />
        {/* Tela de lista de atendimentos (app/areamedica/lista-atendimentos.tsx) */}
        <Stack.Screen name="areamedica/lista-atendimentos" />
        {/* Tela de detalhes da área médica com parâmetro dinâmico (app/areamedica/[id].tsx) */}
        <Stack.Screen name="areamedica/[id]" />
        {/* Tela de configurações (app/config/index.tsx) */}
        <Stack.Screen name="config/index" />
      </Stack>
      {/* Componente de Toast para notificações globais */}
      <Toast />
    </>
  );
}
