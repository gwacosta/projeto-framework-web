// Importação do router do expo-router para navegação
import { router } from "expo-router";
// Importação de hook do React
import { useEffect } from "react";
// Importação de componentes nativos do React Native
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// Importação do Toast para notificações - biblioteca externa
import Toast from 'react-native-toast-message';
// Importação de componente customizado (caminho: components/index.ts)
import { CustomButton } from "../../components";
// Importação do hook de autenticação (caminho: hooks/useAuth.ts)
import { useAuth } from "../../hooks/useAuth";
// Importação do serviço de autenticação (caminho: services/auth.ts)
import { authService } from "../../services/auth";

/**
 * Dados fictícios para demonstração dos próximos atendimentos
 * Em uma aplicação real, estes dados viriam de uma API/banco de dados
 */
const proximosAtendimentos = [
  {
    id: 1,
    horario: "08:30",
    paciente: "Maria Silva",
    medico: "Dr. João Santos"
  },
  {
    id: 2,
    horario: "10:15",
    paciente: "Pedro Oliveira",
    medico: "Dra. Ana Costa"
  },
  {
    id: 3,
    horario: "14:00",
    paciente: "Carlos Ferreira",
    medico: "Dr. Roberto Lima"
  }
];

/**
 * Tela principal da Área Médica
 * Dashboard para gerenciamento de atendimentos e pacientes
 * Tela protegida - requer autenticação
 */
export default function AreaMedica() {
  // Obtém dados do hook de autenticação
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();

  // Efeito para verificar autenticação e redirecionar se necessário
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      // Redireciona para login se não estiver autenticado (app/(auth)/login.tsx)
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn, isLoading]);

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
   * TODO: Implementar navegação para tela de cadastro
   */
  const handleCadastrarAtendimento = () => {
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Cadastro de atendimento será implementado em breve',
      position: 'top',
      visibilityTime: 3000,
    });
  };

  /**
   * Handler para cadastrar novo paciente
   * TODO: Implementar navegação para tela de cadastro
   */
  const handleCadastrarPaciente = () => {
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Cadastro de paciente será implementado em breve',
      position: 'top',
      visibilityTime: 3000,
    });
  };

  /**
   * Handler para ver lista completa de atendimentos
   * TODO: Implementar navegação para tela de listagem
   */
  const handleVerTodosAtendimentos = () => {
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Lista completa de atendimentos será implementada em breve',
      position: 'top',
      visibilityTime: 3000,
    });
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
  const renderAtendimentoCard = (atendimento: typeof proximosAtendimentos[0]) => (
    <View key={atendimento.id} style={styles.atendimentoCard}>
      {/* Container do horário */}
      <View style={styles.horarioContainer}>
        <Text style={styles.horarioText}>{atendimento.horario}</Text>
      </View>
      {/* Container das informações do atendimento */}
      <View style={styles.infoContainer}>
        <Text style={styles.pacienteText}>{atendimento.paciente}</Text>
        <Text style={styles.medicoText}>{atendimento.medico}</Text>
      </View>
    </View>
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
            <View style={styles.atendimentosContainer}>
              {/* Mapeia e renderiza os cards de atendimento */}
              {proximosAtendimentos.map(renderAtendimentoCard)}
            </View>
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
    backgroundColor: '#e74c3c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    zIndex: 1,
  },
  // Texto do botão de logout
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
