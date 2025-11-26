import { StyleSheet } from 'react-native';

/**
 * Estilos para a tela de Cadastro de Funcionário
 * Arquivo: app/areamedica/cadastro-funcionario.tsx
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  contentBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
    padding: 8,
  },
  backButtonText: {
    fontSize: 28,
    color: '#3498db',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    marginTop: 8,
  },
  tipoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  tipoButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  tipoButtonActive: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  tipoText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  tipoTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e74c3c',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});
