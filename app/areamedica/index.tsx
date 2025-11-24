// Importação do router do expo-router para navegação
import { router, useFocusEffect } from "expo-router";
// Importação de hook do React
import { useCallback, useEffect, useState } from "react";
// Importação de componentes nativos do React Native
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// Importação do Toast para notificações - biblioteca externa
import Toast from 'react-native-toast-message';
// Importação de componente customizado (caminho: components/index.ts)
import { ConfirmModal, CustomButton } from "../../components";
// Importação do hook de autenticação (caminho: hooks/useAuth.ts)
import { useAuth } from "../../hooks/useAuth";
// Importação do serviço de autenticação (caminho: services/auth.ts)
import { authService } from "../../services/auth";
// Importação do serviço de notícias (caminho: services/news.ts)
import { NewsArticle, newsService } from "../../services/news";
// Importação do serviço de atendimentos (caminho: services/atendimentos.ts)
import { AtendimentoCompleto, atendimentosService } from "../../services/atendimentos";

/**
 * Tela principal da Área Médica
 * Dashboard para gerenciamento de atendimentos e pacientes
 * Tela protegida - requer autenticação
 */
export default function AreaMedica() {
  // Obtém dados do hook de autenticação
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();
  
  // Estados para as notícias
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [showNews, setShowNews] = useState(false); // Estado para controlar visibilidade das notícias

  // Estados para os atendimentos
  const [proximosAtendimentos, setProximosAtendimentos] = useState<AtendimentoCompleto[]>([]);
  const [loadingAtendimentos, setLoadingAtendimentos] = useState(true);
  const [atendimentoParaCancelar, setAtendimentoParaCancelar] = useState<string | null>(null);

  // Efeito para verificar autenticação e redirecionar se necessário
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Redireciona para login se não estiver autenticado (app/(auth)/login.tsx)
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn, isLoading]);

  // Efeito para carregar os próximos atendimentos
  useEffect(() => {
    if (isLoggedIn) {
      carregarProximosAtendimentos();
    }
  }, [isLoggedIn]);

  // Recarrega os atendimentos sempre que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        carregarProximosAtendimentos();
      }
    }, [isLoggedIn])
  );

  /**
   * Função para carregar os próximos atendimentos do banco
   */
  const carregarProximosAtendimentos = async () => {
    setLoadingAtendimentos(true);
    try {
      const resultado = await atendimentosService.proximosAtendimentos(3);
      if (resultado.success) {
        setProximosAtendimentos(resultado.atendimentos as AtendimentoCompleto[]);
      }
    } catch (error) {
      console.error('Erro ao carregar atendimentos:', error);
    } finally {
      setLoadingAtendimentos(false);
    }
  };

  /**
   * Função para alternar a visibilidade das notícias
   * Busca as notícias apenas na primeira vez que abre
   */
  const toggleNews = () => {
    const newShowNews = !showNews;
    setShowNews(newShowNews);
    
    // Busca notícias apenas se estiver abrindo pela primeira vez e ainda não tiver notícias
    if (newShowNews && news.length === 0 && !loadingNews && !newsError) {
      fetchNews();
    }
  };

  /**
   * Função para buscar notícias de saúde
   */
  const fetchNews = async () => {
    setLoadingNews(true);
    setNewsError(null);
    
    try {
      // Tenta buscar notícias principais do Brasil primeiro
      const result = await newsService.getTopHealthNewsBrazil(3);
      
      if (result.success && result.articles && result.articles.length > 0) {
        setNews(result.articles);
      } else {
        // Se não houver notícias principais, busca notícias gerais de saúde
        const fallbackResult = await newsService.getHealthNews(3);
        
        if (fallbackResult.success && fallbackResult.articles) {
          setNews(fallbackResult.articles);
        } else {
          setNewsError(fallbackResult.message || 'Não foi possível carregar as notícias');
        }
      }
    } catch (error) {
      setNewsError('Erro ao buscar notícias');
      console.error('Erro ao buscar notícias:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  // Exibe indicador de carregamento durante verificação de autenticação
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  // Não renderiza nada se não estiver autenticado (será redirecionado)
  if (!isLoggedIn) {
    return null;
  }

  /**
   * Handler para cadastrar novo atendimento
   * Navega para tela de cadastro
   */
  const handleCadastrarAtendimento = () => {
    router.push('/areamedica/cadastro-atendimento');
  };

  /**
   * Handler para cadastrar novo paciente
   * Navega para tela de cadastro
   */
  const handleCadastrarPaciente = () => {
    router.push('/areamedica/cadastro-paciente');
  };

  /**
   * Handler para cadastrar novo médico
   * Navega para tela de cadastro
   */
  const handleCadastrarFuncionario = () => {
    router.push('/areamedica/cadastro-funcionario');
  };

  /**
   * Handler para ver lista completa de atendimentos
   * Navega para tela de listagem
   */
  const handleVerTodosAtendimentos = () => {
    router.push('/areamedica/lista-atendimentos');
  };

  /**
   * Handler para abrir confirmação de cancelamento
   */
  const handleCancelarAtendimento = (id: string | undefined) => {
    if (!id) return;
    setAtendimentoParaCancelar(id);
  };

  /**
   * Confirma o cancelamento do atendimento
   */
  const confirmarCancelamento = async () => {
    if (!atendimentoParaCancelar) return;

    try {
      const resultado = await atendimentosService.cancelar(atendimentoParaCancelar);

      if (resultado.success) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: resultado.message,
          position: 'top',
          visibilityTime: 2000,
        });
        // Recarrega a lista de próximos atendimentos
        carregarProximosAtendimentos();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao cancelar',
          text2: resultado.message || 'Não foi possível cancelar o atendimento',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Ocorreu um erro ao cancelar o atendimento',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setAtendimentoParaCancelar(null);
    }
  };

  /**
   * Handler para realizar logout do usuário
   * Utiliza o serviço de autenticação e redireciona para login
   */
  const handleLogout = async () => {
    try {
      // Chama o serviço de logout (services/auth.ts)
      const result = await authService.logout();
      
      if (result.success) {
        Toast.show({
          type: 'success',
          text1: 'Logout realizado com sucesso',
          text2: 'Você foi desconectado da aplicação',
          position: 'top',
          visibilityTime: 2000,
        });
        
        // Atualiza o estado de autenticação
        await checkAuthStatus();
        // Redireciona para a tela de login (app/(auth)/login.tsx)
        router.replace('/(auth)/login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro no logout',
          text2: result.message || 'Não foi possível realizar o logout',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro durante o logout',
        text2: 'Ocorreu um erro inesperado',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  /**
   * Função para renderizar um card de atendimento
   * @param atendimento - Objeto com dados do atendimento
   */
  const renderAtendimentoCard = (atendimento: AtendimentoCompleto) => (
    <View key={atendimento.id} style={styles.atendimentoCard}>
      {/* Container do horário */}
      <View style={styles.horarioContainer}>
        <Text style={styles.horarioText}>{atendimento.horario}</Text>
      </View>
      {/* Container das informações do atendimento */}
      <View style={styles.infoContainer}>
        <Text style={styles.pacienteText}>{atendimento.paciente?.nome || 'Paciente'}</Text>
        <Text style={styles.medicoText}>{atendimento.funcionario?.nome || 'Médico'}</Text>
      </View>
      {/* Botão de cancelar - apenas para atendimentos agendados */}
      {atendimento.status === 'agendado' && (
        <TouchableOpacity
          style={styles.cancelAtendimentoButton}
          onPress={() => handleCancelarAtendimento(atendimento.id)}
        >
          <Text style={styles.cancelAtendimentoButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  /**
   * Função para abrir link da notícia no navegador
   * @param url - URL da notícia
   */
  const handleOpenNews = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao abrir notícia',
          text2: 'Não foi possível abrir o link',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao abrir notícia',
        text2: 'Ocorreu um erro ao tentar abrir o link',
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  /**
   * Função para renderizar um card de notícia
   * @param article - Objeto com dados da notícia
   * @param index - Índice da notícia no array
   */
  const renderNewsCard = (article: NewsArticle, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.newsCard}
      onPress={() => handleOpenNews(article.url)}
      activeOpacity={0.7}
    >
      <View style={styles.newsHeader}>
        <Text style={styles.newsSource}>{article.source.name}</Text>
        <Text style={styles.newsDate}>
          {newsService.formatPublishDate(article.publishedAt)}
        </Text>
      </View>
      <Text style={styles.newsTitle} numberOfLines={2}>
        {article.title}
      </Text>
      {article.description && (
        <Text style={styles.newsDescription} numberOfLines={3}>
          {article.description}
        </Text>
      )}
      <Text style={styles.newsReadMore}>Ler mais →</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentBox}>
          {/* Botão de Logout no canto superior direito do card */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>

          {/* Título e subtítulo da área médica */}
          <Text style={styles.title}>Área Médica</Text>
          <Text style={styles.subtitle}>Sistema de Gestão de Atendimentos</Text>

          {/* Seção de Próximos Atendimentos */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Próximos Atendimentos</Text>
            {loadingAtendimentos ? (
              <View style={styles.loadingAtendimentosContainer}>
                <ActivityIndicator size="small" color="#3498db" />
                <Text style={styles.loadingAtendimentosText}>Carregando...</Text>
              </View>
            ) : proximosAtendimentos.length > 0 ? (
              <View style={styles.atendimentosContainer}>
                {proximosAtendimentos.map(renderAtendimentoCard)}
              </View>
            ) : (
              <View style={styles.emptyAtendimentosContainer}>
                <Text style={styles.emptyAtendimentosText}>
                  Nenhum atendimento agendado
                </Text>
              </View>
            )}
          </View>

          {/* Seção de Notícias de Saúde */}
          <View style={styles.sectionContainer}>
            {/* Cabeçalho clicável para expandir/recolher */}
            <TouchableOpacity 
              style={styles.newsToggleHeader}
              onPress={toggleNews}
              activeOpacity={0.7}
            >
              <View style={styles.newsHeaderContent}>
                <Text style={styles.sectionTitle}>Notícias de Saúde</Text>
                {loadingNews && showNews && (
                  <ActivityIndicator size="small" color="#27ae60" style={styles.newsLoader} />
                )}
              </View>
              <Text style={styles.toggleIcon}>{showNews ? '▼' : '▶'}</Text>
            </TouchableOpacity>

            {/* Conteúdo das notícias (visível apenas quando showNews é true) */}
            {showNews && (
              <View style={styles.newsContent}>
                {newsError ? (
                  <View style={styles.newsErrorContainer}>
                    <Text style={styles.newsErrorText}>{newsError}</Text>
                    <TouchableOpacity onPress={fetchNews} style={styles.retryButton}>
                      <Text style={styles.retryButtonText}>Tentar novamente</Text>
                    </TouchableOpacity>
                  </View>
                ) : news.length > 0 ? (
                  <View style={styles.newsContainer}>
                    {news.map(renderNewsCard)}
                  </View>
                ) : loadingNews ? (
                  <View style={styles.newsLoadingContainer}>
                    <ActivityIndicator size="large" color="#27ae60" />
                    <Text style={styles.newsLoadingText}>Carregando notícias...</Text>
                  </View>
                ) : (
                  <View style={styles.newsEmptyContainer}>
                    <Text style={styles.newsEmptyText}>Nenhuma notícia disponível no momento</Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonContainer}>
            {/* Botão principal - componente customizado (components/CustomButton/index.tsx) */}
            <CustomButton
              title="Cadastrar Atendimento"
              onPress={handleCadastrarAtendimento}
              style={styles.primaryButton}
            />
            
            {/* Botão secundário para cadastrar paciente */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleCadastrarPaciente}
            >
              <Text style={styles.secondaryButtonText}>Cadastrar Paciente</Text>
            </TouchableOpacity>

            {/* Botão para cadastrar médico */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleCadastrarFuncionario}
            >
              <Text style={styles.secondaryButtonText}>Cadastrar Médico</Text>
            </TouchableOpacity>

            {/* Botão terciário para ver todos os atendimentos */}
            <TouchableOpacity
              style={styles.tertiaryButton}
              onPress={handleVerTodosAtendimentos}
            >
              <Text style={styles.tertiaryButtonText}>Ver Todos os Atendimentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Confirmação */}
      <ConfirmModal
        visible={!!atendimentoParaCancelar}
        title="Cancelar Atendimento"
        message="Tem certeza que deseja cancelar este atendimento?"
        onConfirm={confirmarCancelamento}
        onCancel={() => setAtendimentoParaCancelar(null)}
      />
    </View>
  );
}

/**
 * Estilos para a tela da Área Médica
 */
const styles = StyleSheet.create({
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
