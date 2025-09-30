import { CustomButton } from '@/components/CustomButton';
import { authService } from '@/services/auth';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

export default function ConfirmCode({ onSuccess, userData }: { onSuccess: () => void, userData: { name: string, email: string, password: string } }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const CORRECT_CODE = '654321';

  const handleAdvance = async () => {
    if (code !== CORRECT_CODE) {
      Toast.show({
        type: 'error',
        text1: 'Código incorreto, tente novamente',
        position: 'top',
        visibilityTime: 2000,
      });
      return;
    }
    setLoading(true);
    try {
      const result = await authService.signup(userData);
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
          position: 'top',
          visibilityTime: 2000,
        });
        setTimeout(() => {
          router.replace('/(auth)/login');
          onSuccess();
        }, 2000);
      } else {
        Toast.show({
          type: 'error',
          text1: result.message || 'Falha ao criar conta',
          position: 'top',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Ocorreu um erro inesperado',
        position: 'top',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
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
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Text style={styles.title}>Código de Confirmação</Text>
            <Text style={styles.description}>
              Digite o código enviado para o seu e-mail (simulação)
            </Text>
            <Text style={styles.codeDisplay}>654321</Text>

            <View style={styles.formContainer}>
              <TextInput
                ref={inputRef}
                style={styles.input}
                keyboardType="numeric"
                maxLength={6}
                value={code}
                onChangeText={setCode}
                placeholder="Digite o código"
                editable={!loading}
              />
              <CustomButton 
                title="Avançar" 
                onPress={handleAdvance} 
                disabled={loading} 
              />
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
  codeDisplay: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 24,
    color: '#3498db',
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  formContainer: {
    width: '100%',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    backgroundColor: '#fff',
    letterSpacing: 2,
  },
});
