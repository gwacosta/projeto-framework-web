import { StyleSheet } from 'react-native';

/**
 * Estilos para o Dashboard da Área Médica
 * Arquivo: app/areamedica/index.tsx
 */
export const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Container de loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ScrollView principal
  scrollView: {
    flex: 1,
  },
  // Conteúdo do scroll
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  // Caixa principal de conteúdo com sombra
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
    alignItems: 'center',
    position: 'relative',
  },
  // Estilo do título principal
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  // Estilo do subtítulo
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  // Container das seções
  sectionContainer: {
    marginBottom: 32,
    width: '100%',
  },
  // Título das seções
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  // Container dos cards de atendimento
  atendimentosContainer: {
    gap: 12,
    width: '100%',
  },
  // Estados de loading e vazio para atendimentos
  loadingAtendimentosContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingAtendimentosText: {
    marginTop: 8,
    fontSize: 14,
    color: '#7f8c8d',
  },
  emptyAtendimentosContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyAtendimentosText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  // Estilo do card de atendimento
  atendimentoCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  // Container do horário no card
  horarioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    marginRight: 16,
  },
  // Texto do horário
  horarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  // Container das informações do atendimento
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  // Texto do nome do paciente
  pacienteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  // Texto do nome do médico
  medicoText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  // Botão de cancelar atendimento no card
  cancelAtendimentoButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#e74c3c',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Texto do botão de cancelar atendimento
  cancelAtendimentoButtonText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  // Container dos botões de ação
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  // Estilo do botão primário
  primaryButton: {
    backgroundColor: '#3498db',
  },
  // Estilo do botão secundário
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#3498db',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  // Texto do botão secundário
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Estilo do botão terciário
  tertiaryButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  // Texto do botão terciário
  tertiaryButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Botão de logout posicionado no canto superior direito
  logoutButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  // Texto do botão de logout
  logoutButtonText: {
    color: '#6c757d',
    fontSize: 12,
    fontWeight: '500',
  },
  // Estilos para a seção de notícias - Header expansível
  newsToggleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 12,
  },
  newsHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  toggleIcon: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  newsContent: {
    width: '100%',
  },
  newsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  newsLoader: {
    marginLeft: 8,
  },
  newsLoadingContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  newsLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#7f8c8d',
  },
  newsContainer: {
    gap: 12,
    width: '100%',
  },
  newsCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#27ae60',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    color: '#27ae60',
    textTransform: 'uppercase',
  },
  newsDate: {
    fontSize: 11,
    color: '#95a5a6',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 8,
  },
  newsReadMore: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: '600',
  },
  newsErrorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  newsErrorText: {
    fontSize: 14,
    color: '#c0392b',
    textAlign: 'center',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  newsEmptyContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  newsEmptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
