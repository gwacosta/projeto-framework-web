// Importação de componentes customizados usando caminho absoluto
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
// Importação do router do expo-router para navegação
import { router } from "expo-router";
// Importação de hooks do React
import { useRef, useState } from "react";
// Importação de componentes nativos do React Native
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// Importação do Toast para notificações - biblioteca externa
import Toast from "react-native-toast-message";
// Importação do componente de confirmação de código (caminho: components/ConfirmCode.tsx)
import ConfirmCode from '../../components/ConfirmCode';

/**
 * Tela de Cadastro
 * Permite ao usuário criar uma nova conta no sistema
 * Redireciona para ConfirmCode após preenchimento dos dados
 */
export default function Signup() {
  // Estados para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  // Refs para navegação entre inputs com o teclado
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  /**
   * Função de cadastro
   * Valida campos e exibe tela de confirmação
   */
  const handleSignUp = () => {
    setErrorMessage("");
    // Validação de campos obrigatórios
    if (!name || !email || !password) {
      const errorMsg = 'Por favor, preencha todos os campos';
      setErrorMessage(errorMsg);
      setTimeout(() => {
        Toast.show({
          type: 'error',
          text1: errorMsg,
          position: 'top',
          visibilityTime: 2000,
        });
      }, 100);
      return;
    }
    // Exibe tela de confirmação de código
    setShowConfirm(true);
  };

  /**
   * Navega para tela de login
   * Redireciona para: app/(auth)/login.tsx
   */
  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  /**
   * Retorna para a tela inicial
   * Redireciona para: app/index.tsx
   */
  const handleGoHome = () => {
    router.push("/");
  };

  // Renderiza componente de confirmação se necessário
  if (showConfirm) {
    return (
      <>
        {/* Componente ConfirmCode (components/ConfirmCode.tsx) */}
        <ConfirmCode
          onSuccess={() => setShowConfirm(false)}
          userData={{ name, email, password }}
        />
        <Toast />
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* KeyboardAvoidingView para ajustar layout quando teclado aparece */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentBox}>
              {/* Logo clicável que retorna para home - caminho: assets/images/logo.png */}
              <TouchableOpacity style={styles.logoContainer} onPress={handleGoHome}>
                <Image
                  source={require("@/assets/images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </TouchableOpacity>

              {/* Título e descrição da tela */}
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.description}>
                Preencha os dados para criar sua conta
              </Text>

              {/* Container de erro (exibido condicionalmente) */}
              {errorMessage ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              ) : null}

              <View style={styles.formContainer}>
                {/* Campo de nome - componente customizado (components/CustomInput/index.tsx) */}
                <CustomInput
                  placeholder="Nome Completo"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => emailInputRef.current?.focus()}
                />

                {/* Campo de email - componente customizado (components/CustomInput/index.tsx) */}
                <CustomInput
                  ref={emailInputRef}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInputRef.current?.focus()}
                />

                {/* Campo de senha - componente customizado (components/CustomInput/index.tsx) */}
                <CustomInput
                  ref={passwordInputRef}
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleSignUp}
                />

                {/* Botão de criar conta - componente customizado (components/CustomButton/index.tsx) */}
                <CustomButton title="Criar Conta" onPress={handleSignUp} />

                {/* Seção para login */}
                <View style={styles.signupContainer}>
                  <Text style={styles.signupText}>Já tem uma conta?</Text>
                  {/* Botão para ir ao login - componente customizado (components/CustomButton/index.tsx) */}
                  <CustomButton
                    title="Faça login"
                    variant="link"
                    onPress={handleLogin}
                    style={{ marginTop: 0 }}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {/* Toast global para notificações */}
      <Toast />
    </>
  );
}

/**
 * Estilos para a tela de cadastro
 */
const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Container do conteúdo
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Conteúdo do scroll
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  // Caixa principal de conteúdo com sombra
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
    alignSelf: 'center',
    alignItems: 'center',
  },
  // Container da logo
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  // Dimensões da logo
  logo: {
    width: 120,
    height: 120,
  },
  // Estilo do título
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  // Estilo da descrição
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  // Container do formulário
  formContainer: {
    width: '100%',
  },
  // Container de mensagem de erro
  errorContainer: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef5350',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  // Texto de erro
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Container da seção de login
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  // Texto da seção de login
  signupText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
