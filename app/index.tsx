// Importação do router do expo-router para navegação entre telas
import { router } from "expo-router";
// Importação de componentes nativos do React Native
import { Image, Text, TouchableOpacity, View } from "react-native";
// Importação dos estilos centralizados
import { styles } from "@/styles/home.styles";

/**
 * Tela inicial da aplicação
 * Apresenta o sistema e oferece opções para login ou cadastro
 * Redireciona para: app/(auth)/login.tsx ou app/(auth)/signup.tsx
 */
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        {/* Logo da aplicação - caminho: assets/images/logo.png */}
        <TouchableOpacity style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Título e descrição do sistema */}
        <Text style={styles.title}>Gestão de Atendimentos</Text>
        <Text style={styles.description}>
          Sistema para gestão de atendimentos clínicos
        </Text>
        
        <View style={styles.buttonContainer}>
          {/* Botão de Login - redireciona para app/(auth)/login.tsx */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push("/(auth)/login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          {/* Botão de Cadastro - redireciona para app/(auth)/signup.tsx */}
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]}
            onPress={() => router.push("/(auth)/signup")}
          >
            <Text style={[styles.buttonText, styles.signupButtonText]}>
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
