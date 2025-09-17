import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { router } from "expo-router";
import { useRef, useState } from "react";
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
} from "react-native";
import { authService } from '../../services/auth';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Refs para os inputs
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    // Limpar mensagem de erro anterior
    setErrorMessage("");
    
    console.log('=== INÍCIO handleSignUp ===');
    console.log('name:', `"${name}"`);
    console.log('email:', `"${email}"`);
    console.log('password:', `"${password}"`);
    
    if (!name || !email || !password) {
      console.log('=== CAMPOS INCOMPLETOS ===');
      const errorMsg = 'Por favor, preencha todos os campos';
      setErrorMessage(errorMsg);
      
      // Tentar Alert como backup
      setTimeout(() => {
        Alert.alert('Erro', errorMsg);
      }, 100);
      
      return;
    }

    console.log('=== TODOS OS CAMPOS PREENCHIDOS ===');
    console.log('Chamando authService.signup...');
    
    try {
      const result = await authService.signup({
        name,
        email,
        password,
      });

      console.log('Resultado do signup:', result);

      if (result.success) {
        console.log('Sucesso - navegando para /projects');
        router.replace('/projects');
      } else {
        console.log('Erro no signup - mostrando alert');
        const errorMsg = result.message || 'Falha ao criar conta';
        setErrorMessage(errorMsg);
        
        // Tentar Alert como backup
        setTimeout(() => {
          Alert.alert('Erro', errorMsg);
        }, 100);
      }
    } catch (error) {
      console.log('Erro na execução do signup:', error);
      const errorMsg = 'Ocorreu um erro inesperado';
      setErrorMessage(errorMsg);
      
      // Tentar Alert como backup
      setTimeout(() => {
        Alert.alert('Erro', errorMsg);
      }, 100);
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
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
            <TouchableOpacity style={styles.logoContainer} onPress={handleGoHome}>
              <Image
                source={require("@/assets/images/react-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.description}>
              Preencha os dados para criar sua conta
            </Text>

            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            <View style={styles.formContainer}>
              <CustomInput
                placeholder="Nome Completo"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />

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

              <CustomInput
                ref={passwordInputRef}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
              />

              <CustomButton title="Criar Conta" onPress={handleSignUp} />

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Já tem uma conta?</Text>
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
  errorContainer: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef5350',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
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
