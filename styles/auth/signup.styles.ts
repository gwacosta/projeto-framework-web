import { StyleSheet } from 'react-native';

/**
 * Estilos para a tela de cadastro (Signup)
 * Arquivo: app/(auth)/signup.tsx
 */
export const styles = StyleSheet.create({
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
  // Dimensões da logo
  logo: {
    width: 120,
    height: 120,
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
  // Container do formulário
  formContainer: {
    width: '100%',
  },
  // Container de mensagem de erro
  errorContainer: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ef5350',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    width: '100%',
  },
  // Texto de erro
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  // Container da seção de login
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  // Texto da seção de login
  signupText: {
    color: '#7f8c8d',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
});
