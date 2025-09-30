// Importação de componente customizado usando caminho absoluto
import { CustomButton } from '@/components/CustomButton';
// Importação do serviço de autenticação usando caminho absoluto (services/auth.ts)
import { authService } from '@/services/auth';
// Importação do router do expo-router para navegação
import { router } from 'expo-router';
// Importação de hooks do React
import { useRef, useState } from 'react';
// Importação de componentes nativos do React Native
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Importação do Toast para notificações - biblioteca externa
import Toast from 'react-native-toast-message';

/**
 * Componente de Confirmação de Código
 * Tela para verificação de código de confirmação no processo de cadastro
 * Props:
 * - onSuccess: Callback chamado quando confirmação é bem-sucedida
 * - userData: Dados do usuário para finalizar o cadastro (vem de app/(auth)/signup.tsx)
 */
export default function ConfirmCode({ onSuccess, userData }: { onSuccess: () => void, userData: { name: string, email: string, password: string } }) {
  // Estados do componente
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  // Código fixo para simulação (em produção seria gerado dinamicamente)
  const CORRECT_CODE = '654321';

  /**
   * Função para avançar após confirmação do código
   * Valida o código e finaliza o cadastro via serviço de autenticação
   */
  const handleAdvance = async () => {
    // Validação do código inserido
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
      // Chama o serviço de cadastro (services/auth.ts)
      const result = await authService.signup(userData);
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
          position: 'top',
          visibilityTime: 2000,
        });
        // Aguarda 2 segundos e redireciona para login (app/(auth)/login.tsx)
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

  /**
   * Retorna para a tela inicial
   * Redireciona para: app/index.tsx
   */
  const handleGoHome = () => {
    router.push("/");
  };

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
                source={require('../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Título e descrição da tela */}
            <Text style={styles.title}>Código de Confirmação</Text>
            <Text style={styles.description}>
              Digite o código enviado para o seu e-mail (simulação)
            </Text>
            {/* Exibição do código correto para simulação */}
            <Text style={styles.codeDisplay}>654321</Text>

            <View style={styles.formContainer}>
              {/* Campo de entrada do código de confirmação */}
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
              {/* Botão de confirmação - componente customizado (components/CustomButton/index.tsx) */}
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

/**
 * Estilos para o componente ConfirmCode
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
  // Dimensões da logo (menor que outras telas)
  logo: {
    width: 80,
    height: 80,
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
  // Exibição visual do código correto
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
  // Container do formulário
  formContainer: {
    width: '100%',
  },
  // Campo de entrada do código
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
