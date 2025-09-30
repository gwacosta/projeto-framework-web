// Importação do router do expo-router para navegação
import { router } from 'expo-router';
// Importação de hooks do React
import { useEffect, useRef, useState } from 'react';
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
} from 'react-native';
// Importação do Toast para notificações - biblioteca externa
import Toast from 'react-native-toast-message';
// Importação de componentes customizados (caminho: components/index.ts)
import { CustomButton, CustomInput } from '../../components';
// Importação do hook de autenticação (caminho: hooks/useAuth.ts)
import { useAuth } from '../../hooks/useAuth';
// Importação do serviço de autenticação (caminho: services/auth.ts)
import { authService } from '../../services/auth';

/**
 * Tela de Login
 * Permite ao usuário fazer autenticação no sistema
 * Redireciona para: app/areamedica/index.tsx após login bem-sucedido
 */
export default function Login() {
  // Estados para os campos do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Ref para navegação entre inputs com o teclado
  const passwordInputRef = useRef<TextInput>(null);

  // Obtém dados do hook de autenticação
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();

  // Efeito para redirecionar usuário já logado
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/areamedica');
    }
  }, [isLoggedIn, isLoading]);

  /**
   * Função de login
   * Valida campos e faz chamada ao serviço de autenticação
   */
  const handleLogin = async () => {
    // Validação de campos obrigatórios
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, preencha todos os campos',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }

    // Chama o serviço de login (services/auth.ts)
    const result = await authService.login(email, password);
    
    if (result.success) {
      // Atualiza o estado de autenticação
      await checkAuthStatus();
      // Redireciona para área médica (app/areamedica/index.tsx)
      router.replace('/areamedica');
    } else {
      // Exibe mensagem de erro
      Toast.show({
        type: 'error',
        text1: result.message || 'Credenciais inválidas',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  /**
   * Navega para tela de cadastro
   * Redireciona para: app/(auth)/signup.tsx
   */
  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  /**
   * Retorna para a tela inicial
   * Redireciona para: app/index.tsx
   */
  const handleGoHome = () => {
    router.push("/");
  };

  // Não renderiza se ainda está carregando
  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* KeyboardAvoidingView para ajustar layout quando teclado aparece */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Título e descrição da tela */}
            <Text style={styles.title}>Fazer Login</Text>
            <Text style={styles.description}>
              Digite seus dados para acessar sua conta
            </Text>

            <View style={styles.formContainer}>
              {/* Campo de email - componente customizado (components/CustomInput/index.tsx) */}
              <CustomInput
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
                onSubmitEditing={handleLogin}
              />

              {/* Botão de login - componente customizado (components/CustomButton/index.tsx) */}
              <CustomButton 
                title="Entrar"
                onPress={handleLogin}
              />

              {/* Seção para cadastro */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Ainda não tem uma conta?</Text>
                {/* Botão para ir ao cadastro - componente customizado (components/CustomButton/index.tsx) */}
                <CustomButton
                  title="Cadastre-se"
                  variant="link"
                  onPress={handleSignUp}
                  style={{ marginTop: 0 }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

/**
 * Estilos para a tela de login
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
  // Container da seção de cadastro
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  // Texto da seção de cadastro
  signupText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
