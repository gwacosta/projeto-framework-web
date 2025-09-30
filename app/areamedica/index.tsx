import { router } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Toast from 'react-native-toast-message';
import { CustomButton } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { authService } from "../../services/auth";

// Dados fictícios para os próximos atendimentos
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

export default function AreaMedica() {
  const { isLoggedIn, isLoading, checkAuthStatus } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/(auth)/login');
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return null; // Será redirecionado pelo useEffect
  }

  const handleCadastrarAtendimento = () => {
    // TODO: Implementar navegação para cadastro de atendimento
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Cadastro de atendimento será implementado em breve',
      position: 'top',
      visibilityTime: 3000,
    });
  };

  const handleCadastrarPaciente = () => {
    // TODO: Implementar navegação para cadastro de paciente
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Cadastro de paciente será implementado em breve',
      position: 'top',
      visibilityTime: 3000,
    });
  };

  const handleVerTodosAtendimentos = () => {
    // TODO: Implementar navegação para lista completa de atendimentos
    Toast.show({
      type: 'info',
      text1: 'Funcionalidade em desenvolvimento',
      text2: 'Lista completa de atendimentos será implementada em breve',
      position: 'top',
      visibilityTime: 3000,
    });
  };

  const handleLogout = async () => {
    try {
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
        // Redireciona para a tela de login
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

  const renderAtendimentoCard = (atendimento: typeof proximosAtendimentos[0]) => (
    <View key={atendimento.id} style={styles.atendimentoCard}>
      <View style={styles.horarioContainer}>
        <Text style={styles.horarioText}>{atendimento.horario}</Text>
      </View>
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

          <Text style={styles.title}>Área Médica</Text>
          <Text style={styles.subtitle}>Sistema de Gestão de Atendimentos</Text>

          {/* Seção de Próximos Atendimentos */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Próximos Atendimentos</Text>
            <View style={styles.atendimentosContainer}>
              {proximosAtendimentos.map(renderAtendimentoCard)}
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Cadastrar Atendimento"
              onPress={handleCadastrarAtendimento}
              style={styles.primaryButton}
            />
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleCadastrarPaciente}
            >
              <Text style={styles.secondaryButtonText}>Cadastrar Paciente</Text>
            </TouchableOpacity>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  sectionContainer: {
    marginBottom: 32,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  atendimentosContainer: {
    gap: 12,
    width: '100%',
  },
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
  horarioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    marginRight: 16,
  },
  horarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pacienteText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  medicoText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#3498db',
  },
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
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  tertiaryButtonText: {
    color: '#6c757d',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
