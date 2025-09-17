import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { styles } from "@/styles/auth/login.styles";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

  // Refs para os inputs
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor, preencha todos os campos');
      return;
    }

    const result = await authService.signup({
      name,
      email,
      password,
    });

    if (result.success) {
      router.replace('/projects');
    } else {
      Alert.alert('Error', result.message || 'Falha ao criar conta');
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient colors={["#1a237e", "#b490dfff"]} style={styles.container}>
      {/* KeyboardAvoidingView ajusta o layout quando o teclado é exibido
              - iOS (padding): Adiciona padding inferior igual à altura do teclado
              - Android (height): Ajusta a altura do container, pois o Android já
                gerencia o redimensionamento da janela automaticamente
          */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

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

            <CustomButton title="Entrar" onPress={handleSignUp} />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Já tem uma conta? </Text>
              <CustomButton
                title="Faça login"
                variant="link"
                onPress={handleLogin}
                style={{ marginTop: 0 }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
