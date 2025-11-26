// Importação do router do expo-router para navegação
import { router } from "expo-router";
// Importação de hooks do React
import { useEffect, useRef, useState } from "react";
// Importação de componentes nativos do React Native
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
// Importação do Toast para notificações
import Toast from 'react-native-toast-message';
// Importação de componente customizado
import { CustomButton, CustomInput } from "../../components";
// Importação dos serviços
import { atendimentosService } from "../../services/atendimentos";
import { Funcionario, funcionariosService } from "../../services/funcionarios";
import { Paciente, pacientesService } from "../../services/pacientes";
// Importação dos estilos centralizados
import { styles } from "../../styles/areamedica/cadastro-atendimento.styles";

/**
 * Tela de Cadastro de Atendimentos
 * Permite cadastrar novos atendimentos no sistema
 */
export default function CadastroAtendimento() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<string>("");
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<string>("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [tipo, setTipo] = useState<'Consulta' | 'Retorno' | 'Exame' | 'Urgência'>('Consulta');
  const [observacoes, setObservacoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const horarioInputRef = useRef<TextInput>(null);
  const observacoesInputRef = useRef<TextInput>(null);

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
   * Carrega pacientes e funcionários ao montar o componente
   */
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoadingData(true);
    try {
      const [pacientesRes, funcionariosRes] = await Promise.all([
        pacientesService.listar(),
        funcionariosService.listarMedicos(),
      ]);

      if (pacientesRes.success) {
        setPacientes(pacientesRes.pacientes || []);
      }

      if (funcionariosRes.success) {
        setFuncionarios(funcionariosRes.funcionarios || []);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar dados',
        text2: 'Não foi possível carregar pacientes e médicos',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoadingData(false);
    }
  };

  /**
   * Formata data no padrão DD/MM/AAAA
   */
  const formatarData = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 8) {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
    }
    return data;
  };

  /**
   * Formata horário no padrão HH:MM
   */
  const formatarHorario = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 4) {
      return apenasNumeros.replace(/(\d{2})(\d)/, '$1:$2');
    }
    return horario;
  };

  /**
   * Converte data de DD/MM/AAAA para AAAA-MM-DD
   */
  const converterDataParaISO = (dataStr: string): string => {
    const partes = dataStr.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return dataStr;
  };

  /**
   * Valida os campos do formulário
   */
  const validarCampos = (): boolean => {
    if (!pacienteSelecionado) {
      Toast.show({
        type: 'error',
        text1: 'Paciente obrigatório',
        text2: 'Por favor, selecione um paciente',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (!funcionarioSelecionado) {
      Toast.show({
        type: 'error',
        text1: 'Médico obrigatório',
        text2: 'Por favor, selecione um médico',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (data.replace(/\D/g, '').length !== 8) {
      Toast.show({
        type: 'error',
        text1: 'Data inválida',
        text2: 'Por favor, informe uma data válida',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (horario.replace(/\D/g, '').length !== 4) {
      Toast.show({
        type: 'error',
        text1: 'Horário inválido',
        text2: 'Por favor, informe um horário válido',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    return true;
  };

  /**
   * Função para cadastrar atendimento
   */
  const handleCadastrar = async () => {
    if (!validarCampos()) {
      return;
    }

    setLoading(true);

    try {
      const resultado = await atendimentosService.criar({
        pacienteId: pacienteSelecionado,
        funcionarioId: funcionarioSelecionado,
        data: converterDataParaISO(data),
        horario,
        tipo,
        status: 'agendado',
        observacoes: observacoes.trim() || undefined,
      });

      if (resultado.success) {
        Toast.show({
          type: 'success',
          text1: 'Sucesso!',
          text2: resultado.message,
          position: 'top',
          visibilityTime: 2000,
        });

        // Limpa os campos
        setPacienteSelecionado("");
        setFuncionarioSelecionado("");
        setData("");
        setHorario("");
        setTipo('Consulta');
        setObservacoes("");

        // Volta para a tela anterior após 1 segundo
        setTimeout(() => {
          handleVoltar();
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao cadastrar',
          text2: resultado.message || 'Não foi possível cadastrar o atendimento',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Ocorreu um erro ao cadastrar o atendimento',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
        <Text style={styles.loadingText}>Carregando dados...</Text>
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
          {/* Botão de voltar */}
          <TouchableOpacity style={styles.backButton} onPress={handleVoltar}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Cadastro de Atendimento</Text>
          <Text style={styles.subtitle}>Preencha os dados do atendimento</Text>

          <View style={styles.formContainer}>
            {/* Seleção de Paciente */}
            <Text style={styles.label}>Paciente *</Text>
            <ScrollView style={styles.selectContainer} nestedScrollEnabled>
              {pacientes.map((paciente) => (
                <TouchableOpacity
                  key={paciente.id}
                  style={[
                    styles.selectItem,
                    pacienteSelecionado === paciente.id && styles.selectItemActive
                  ]}
                  onPress={() => setPacienteSelecionado(paciente.id!)}
                >
                  <Text style={[
                    styles.selectText,
                    pacienteSelecionado === paciente.id && styles.selectTextActive
                  ]}>
                    {paciente.nome}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Seleção de Médico */}
            <Text style={styles.label}>Médico *</Text>
            <ScrollView style={styles.selectContainer} nestedScrollEnabled>
              {funcionarios.map((funcionario) => (
                <TouchableOpacity
                  key={funcionario.id}
                  style={[
                    styles.selectItem,
                    funcionarioSelecionado === funcionario.id && styles.selectItemActive
                  ]}
                  onPress={() => setFuncionarioSelecionado(funcionario.id!)}
                >
                  <Text style={[
                    styles.selectText,
                    funcionarioSelecionado === funcionario.id && styles.selectTextActive
                  ]}>
                    {funcionario.nome} {funcionario.especialidade && `- ${funcionario.especialidade}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <CustomInput
              placeholder="Data (DD/MM/AAAA) *"
              value={data}
              onChangeText={(text) => setData(formatarData(text))}
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => horarioInputRef.current?.focus()}
            />

            <CustomInput
              ref={horarioInputRef}
              placeholder="Horário (HH:MM) *"
              value={horario}
              onChangeText={(text) => setHorario(formatarHorario(text))}
              keyboardType="numeric"
              maxLength={5}
              returnKeyType="next"
              onSubmitEditing={() => observacoesInputRef.current?.focus()}
            />

            {/* Seletor de tipo */}
            <Text style={styles.label}>Tipo de Atendimento *</Text>
            <View style={styles.tipoContainer}>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'Consulta' && styles.tipoButtonActive]}
                onPress={() => setTipo('Consulta')}
              >
                <Text style={[styles.tipoText, tipo === 'Consulta' && styles.tipoTextActive]}>Consulta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'Retorno' && styles.tipoButtonActive]}
                onPress={() => setTipo('Retorno')}
              >
                <Text style={[styles.tipoText, tipo === 'Retorno' && styles.tipoTextActive]}>Retorno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'Exame' && styles.tipoButtonActive]}
                onPress={() => setTipo('Exame')}
              >
                <Text style={[styles.tipoText, tipo === 'Exame' && styles.tipoTextActive]}>Exame</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoButton, tipo === 'Urgência' && styles.tipoButtonActive]}
                onPress={() => setTipo('Urgência')}
              >
                <Text style={[styles.tipoText, tipo === 'Urgência' && styles.tipoTextActive]}>Urgência</Text>
              </TouchableOpacity>
            </View>

            <CustomInput
              ref={observacoesInputRef}
              placeholder="Observações"
              value={observacoes}
              onChangeText={setObservacoes}
              multiline
              numberOfLines={3}
              returnKeyType="done"
              onSubmitEditing={handleCadastrar}
            />

            <CustomButton
              title={loading ? "Cadastrando..." : "Cadastrar Atendimento"}
              onPress={handleCadastrar}
              disabled={loading}
            />

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleVoltar}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
