// Importação de componente customizado usando caminho absoluto
import { CustomButton } from '@/components/CustomButton';
// Importação do serviço de autenticação usando caminho absoluto (services/auth.ts)
import { authService } from '@/services/auth';
// Importação do router do expo-router para navegação
import { router } from 'expo-router';
// Importação de hooks do React
import { useRef, useState } from 'react';
// Importação de componentes nativos do React Native
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Importação do Toast para notificações - biblioteca externa
import Toast from 'react-native-toast-message';
// Importação dos estilos centralizados
import { styles } from '@/styles/components/confirmCode.styles';

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
