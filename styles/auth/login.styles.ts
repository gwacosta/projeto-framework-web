// Importação da API de estilos do React Native
import { StyleSheet } from 'react-native';

/**
 * Estilos específicos para a tela de login
 * 
 * NOTA: Este arquivo parece estar em desuso ou ser uma versão antiga
 * Os estilos atuais da tela de login estão definidos diretamente no componente
 * (app/(auth)/login.tsx)
 * 
 * Mantido para referência ou uso futuro
 */
export const styles = StyleSheet.create({
  // Container principal da tela
  container: {
    flex: 1,
  },
  // Container do conteúdo principal
  content: {
    flex: 1,
    padding: 20,
  },
  // Configuração do conteúdo do ScrollView
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  // Botão de voltar posicionado no canto superior esquerdo
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  // Texto do botão de voltar
  backButtonText: {
    color: '#fff',
    fontSize: 28,
  },
  // Container da logo
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  // Dimensões da logo (maior que a versão atual)
  logo: {
    width: 150,
    height: 150,
  },
  // Container do formulário
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  // Container da seção de cadastro
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  // Texto da seção de cadastro
  signupText: {
    color: '#fff', // Cor branca sugere fundo escuro (diferente da implementação atual)
    fontSize: 14,
  },
});
