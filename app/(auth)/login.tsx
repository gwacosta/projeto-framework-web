import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Alert,
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
import { CustomButton, CustomInput } from '../../components';
import { authService } from '../../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Refs para os inputs
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, preencha todos os campos');
      return;
    }

    const result = await authService.login(email, password);
    
    if (result.success) {
      router.push('/projects');
    } else {
      Alert.alert('Error', result.message || 'Credenciais inválidas');
    }
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleGoHome = () => {
    router.push("/");
  };

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
                source={require('../../assets/images/react-logo.png')}
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
    width: 80,
    height: 80,
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
