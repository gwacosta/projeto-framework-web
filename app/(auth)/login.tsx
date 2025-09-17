import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CustomButton, CustomInput } from '../../components';
import { authService } from '../../services/auth';
import { styles } from '../../styles/auth/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#b490dfff']}
      style={styles.container}
    >
      {/* KeyboardAvoidingView ajusta o layout quando o teclado é exibido
          - iOS (padding): Adiciona padding inferior igual à altura do teclado
          - Android (height): Ajusta a altura do container, pois o Android já
            gerencia o redimensionamento da janela automaticamente
      */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              source={require('../../assets/images/react-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.formContainer}>
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <CustomButton 
            title="Entrar"
            onPress={handleLogin}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Ainda não tem uma conta? </Text>
            <CustomButton
              title="Cadastre-se"
              variant="link"
              onPress={handleSignUp}
              style={{ marginTop: 0 }}
            />
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
