import { CustomButton } from '@/components/CustomButton';
import { authService } from '@/services/auth';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
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
        Alert.alert('Erro', result.message || 'Falha ao criar conta');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.contentBox}>
          <Text style={styles.title}>Código de Confirmação</Text>
          <Text style={styles.text}>Digite o código enviado para o seu e-mail (simulação)</Text>
          <Text style={styles.codeTitle}>654321</Text>
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
          <CustomButton title="Avançar" onPress={handleAdvance} disabled={loading} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentBox: {
    width: 340,
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
  codeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 16,
    color: '#007AFF',
  },
  input: {
    width: 180,
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 18,
    backgroundColor: '#fff',
  },
});
