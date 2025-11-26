import { StyleSheet } from 'react-native';

/**
 * Estilos para o componente ConfirmCode
 * Arquivo: components/ConfirmCode.tsx
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
