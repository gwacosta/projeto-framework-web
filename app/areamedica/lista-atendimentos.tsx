// Importação do router do expo-router para navegação
import { router } from "expo-router";
// Importação de hooks do React
import { useEffect, useState } from "react";
// Importação de componentes nativos do React Native
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
// Importação do Toast para notificações
import Toast from 'react-native-toast-message';
// Importação de componentes customizados
import { ConfirmModal } from "../../components";
// Importação do serviço de atendimentos
import { AtendimentoCompleto, atendimentosService } from "../../services/atendimentos";

/**
 * Tela de Listagem de Atendimentos
 * Mostra todos os atendimentos do dia atual
 */
export default function ListaAtendimentos() {
  const [atendimentos, setAtendimentos] = useState<AtendimentoCompleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSelecionada, setDataSelecionada] = useState(new Date());
  const [dataFormatada, setDataFormatada] = useState("");
  const [inputData, setInputData] = useState("");
  const [atendimentoParaCancelar, setAtendimentoParaCancelar] = useState<string | null>(null);

  useEffect(() => {
    carregarAtendimentos();
  }, [dataSelecionada]);

  useEffect(() => {
    setInputData(dataFormatada);
  }, [dataFormatada]);

  /**
   * Carrega os atendimentos do dia selecionado
   */
  const carregarAtendimentos = async () => {
    setLoading(true);
    
    try {
      const dataISO = dataSelecionada.toISOString().split('T')[0];
      setDataFormatada(dataSelecionada.toLocaleDateString('pt-BR'));

      const resultado = await atendimentosService.listarPorData(dataISO, true);

      if (resultado.success) {
        setAtendimentos(resultado.atendimentos as AtendimentoCompleto[]);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao carregar',
          text2: resultado.message || 'Não foi possível carregar os atendimentos',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Ocorreu um erro ao carregar os atendimentos',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Função para voltar com fallback
   */
  const handleVoltar = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/areamedica');
    }
  };

  /**
   * Avança para o próximo dia
   */
  const handleProximoDia = () => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() + 1);
    setDataSelecionada(novaData);
  };

  /**
   * Volta para o dia anterior
   */
  const handleDiaAnterior = () => {
    const novaData = new Date(dataSelecionada);
    novaData.setDate(novaData.getDate() - 1);
    setDataSelecionada(novaData);
  };

  /**
   * Volta para hoje
   */
  const handleHoje = () => {
    setDataSelecionada(new Date());
  };

  /**
   * Atualiza apenas o texto do input sem aplicar a data
   */
  const handleMudancaData = (texto: string) => {
    setInputData(texto);
  };

  /**
   * Aplica a data digitada (chamado ao pressionar Enter ou perder foco)
   */
  const aplicarDataDigitada = () => {
    // Tenta parsear a data nos formatos DD/MM/YYYY ou DD/MM/YY
    const regex = /^(\d{2})\/(\d{2})\/(\d{2,4})$/;
    const match = inputData.match(regex);
    
    if (match) {
      const dia = parseInt(match[1]);
      const mes = parseInt(match[2]) - 1; // Mês começa em 0
      let ano = parseInt(match[3]);
      
      // Se ano tem 2 dígitos, assume 20XX
      if (ano < 100) {
        ano += 2000;
      }
      
      const novaData = new Date(ano, mes, dia);
      
      // Valida se a data é válida
      if (!isNaN(novaData.getTime())) {
        setDataSelecionada(novaData);
      } else {
        // Se inválida, volta para a data formatada atual
        setInputData(dataFormatada);
      }
    } else {
      // Se formato inválido, volta para a data formatada atual
      setInputData(dataFormatada);
    }
  };

  /**
   * Abre confirmação de cancelamento
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
        // Recarrega a lista
        carregarAtendimentos();
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
   * Retorna a cor de acordo com o status
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agendado':
        return '#3498db';
      case 'em_atendimento':
        return '#f39c12';
      case 'concluido':
        return '#27ae60';
      case 'cancelado':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  /**
   * Retorna o texto do status em português
   */
  const getStatusTexto = (status: string) => {
    switch (status) {
      case 'agendado':
        return 'Agendado';
      case 'em_atendimento':
        return 'Em Atendimento';
      case 'concluido':
        return 'Concluído';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  /**
   * Renderiza um card de atendimento
   */
  const renderAtendimentoCard = (atendimento: AtendimentoCompleto) => (
    <View key={atendimento.id} style={styles.atendimentoCard}>
      <View style={styles.cardHeader}>
        <View style={styles.horarioContainer}>
          <Text style={styles.horarioText}>{atendimento.horario}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(atendimento.status) }
          ]}
        >
          <Text style={styles.statusText}>{getStatusTexto(atendimento.status)}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Paciente:</Text>
          <Text style={styles.infoValue}>{atendimento.paciente?.nome || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Médico:</Text>
          <Text style={styles.infoValue}>{atendimento.funcionario?.nome || 'N/A'}</Text>
        </View>

        {atendimento.funcionario?.especialidade && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Especialidade:</Text>
            <Text style={styles.infoValue}>{atendimento.funcionario.especialidade}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoValue}>{atendimento.tipo}</Text>
        </View>

        {atendimento.observacoes && (
          <View style={styles.observacoesContainer}>
            <Text style={styles.infoLabel}>Observações:</Text>
            <Text style={styles.observacoesText}>{atendimento.observacoes}</Text>
          </View>
        )}

        {atendimento.status === 'agendado' && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => handleCancelarAtendimento(atendimento.id)}
          >
            <Text style={styles.cancelButtonText}>Cancelar Atendimento</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando atendimentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentBox}>
          {/* Header */}
          <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Atendimentos do Dia</Text>
          
          {/* Seletor de Data */}
          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.arrowButton} onPress={handleDiaAnterior}>
              <Text style={styles.arrowText}>‹</Text>
            </TouchableOpacity>
            
            <TextInput
              style={styles.dateInput}
              value={inputData}
              onChangeText={handleMudancaData}
              onBlur={aplicarDataDigitada}
              onSubmitEditing={aplicarDataDigitada}
              placeholder="DD/MM/AAAA"
              placeholderTextColor="#95a5a6"
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="done"
            />
            
            <TouchableOpacity style={styles.arrowButton} onPress={handleProximoDia}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.todayButton} onPress={handleHoje}>
            <Text style={styles.todayButtonText}>Hoje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.refreshButton} onPress={carregarAtendimentos}>
            <Text style={styles.refreshButtonText}>↻ Atualizar</Text>
          </TouchableOpacity>

          {/* Lista de Atendimentos */}
          {atendimentos.length > 0 ? (
            <View style={styles.atendimentosContainer}>
              {atendimentos.map(renderAtendimentoCard)}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhum atendimento agendado para este dia</Text>
            </View>
          )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7f8c8d',
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
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  dateInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    minWidth: 140,
    fontWeight: '600',
  },
  arrowButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 32,
    color: '#3498db',
    fontWeight: '300',
  },
  todayButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  todayButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  refreshButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  atendimentosContainer: {
    gap: 16,
  },
  atendimentoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  horarioContainer: {
    backgroundColor: '#3498db',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  horarioText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginRight: 8,
    minWidth: 100,
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
  },
  observacoesContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  observacoesText: {
    fontSize: 14,
    color: '#2c3e50',
    marginTop: 4,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
