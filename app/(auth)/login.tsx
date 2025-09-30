import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
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
import Toast from 'react-native-toast-message';
import { CustomButton, CustomInput } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { authService } from '../../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Refs para os inputs
  const passwordInputRef = useRef<TextInput>(null);

  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.replace('/areamedica');
    }
  }, [isLoggedIn, isLoading]);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Por favor, preencha todos os campos',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }

    const result = await authService.login(email, password);
    
    if (result.success) {
      // Atualiza o estado de autenticação
      await checkAuthStatus();
      router.replace('/areamedica');
    } else {
      Toast.show({
        type: 'error',
        text1: result.message || 'Credenciais inválidas',
        position: 'top',
        visibilityTime: 2000,
      });
    }
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleGoHome = () => {
    router.push("/");
  };

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.container}>
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
            <TouchableOpacity style={styles.logoContainer} onPress={handleGoHome}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Fazer Login</Text>
            <Text style={styles.description}>
              Digite seus dados para acessar sua conta
            </Text>

            <View style={styles.formContainer}>
              <CustomInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              <CustomInput
                ref={passwordInputRef}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <CustomButton 
                title="Entrar"
                onPress={handleLogin}
              />

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Ainda não tem uma conta?</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  formContainer: {
    width: '100%',
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
