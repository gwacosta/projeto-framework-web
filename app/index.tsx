// Importação do router do expo-router para navegação entre telas
import { router } from "expo-router";
// Importação de componentes nativos do React Native
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

/**
 * Estilos para a tela inicial
 */
const styles = StyleSheet.create({
  // Container principal com fundo cinza claro
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  // Caixa de conteúdo centralizada com sombra
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  // Container da logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // Dimensões da imagem da logo
  logo: {
    width: 120,
    height: 120,
  },
  // Estilo do título principal
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  // Estilo da descrição
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  // Container dos botões
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  // Estilo base dos botões
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Variação do botão de cadastro (outline)
  signupButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
  },
  // Texto dos botões
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Texto do botão de cadastro
  signupButtonText: {
    color: '#3498db',
  },
});
