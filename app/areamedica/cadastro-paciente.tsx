// Importação do router do expo-router para navegação
import { router } from "expo-router";
// Importação de hooks do React
import { useRef, useState } from "react";
// Importação de componentes nativos do React Native
import {
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
// Importação do serviço de pacientes
import { pacientesService } from "../../services/pacientes";
// Importação dos estilos centralizados
import { styles } from "../../styles/areamedica/cadastro-paciente.styles";

/**
 * Tela de Cadastro de Pacientes
 * Permite cadastrar novos pacientes no sistema
 */
export default function CadastroPaciente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs para navegação entre campos
  const cpfInputRef = useRef<TextInput>(null);
  const dataNascimentoInputRef = useRef<TextInput>(null);
  const telefoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const enderecoInputRef = useRef<TextInput>(null);

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
   * Formata CPF no padrão XXX.XXX.XXX-XX
   */
  const formatarCPF = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return cpf;
  };

  /**
   * Formata telefone no padrão (XX) XXXXX-XXXX
   */
  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return telefone;
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
    return dataNascimento;
  };

  /**
   * Converte data de DD/MM/AAAA para AAAA-MM-DD
   */
  const converterDataParaISO = (data: string): string => {
    const partes = data.split('/');
    if (partes.length === 3) {
      return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return data;
  };

  /**
   * Valida os campos do formulário
   */
  const validarCampos = (): boolean => {
    if (!nome.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Nome obrigatório',
        text2: 'Por favor, informe o nome do paciente',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (cpf.replace(/\D/g, '').length !== 11) {
      Toast.show({
        type: 'error',
        text1: 'CPF inválido',
        text2: 'Por favor, informe um CPF válido',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (dataNascimento.replace(/\D/g, '').length !== 8) {
      Toast.show({
        type: 'error',
        text1: 'Data de nascimento inválida',
        text2: 'Por favor, informe uma data válida',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    if (telefone.replace(/\D/g, '').length < 10) {
      Toast.show({
        type: 'error',
        text1: 'Telefone inválido',
        text2: 'Por favor, informe um telefone válido',
        position: 'top',
        visibilityTime: 3000,
      });
      return false;
    }

    return true;
  };

  /**
   * Função para cadastrar paciente
   */
  const handleCadastrar = async () => {
    if (!validarCampos()) {
      return;
    }

    setLoading(true);

    try {
      const resultado = await pacientesService.criar({
        nome: nome.trim(),
        cpf,
        dataNascimento: converterDataParaISO(dataNascimento),
        telefone,
        email: email.trim(),
        endereco: endereco.trim(),
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
        setNome("");
        setCpf("");
        setDataNascimento("");
        setTelefone("");
        setEmail("");
        setEndereco("");

        // Volta para a tela anterior após 1 segundo
        setTimeout(() => {
          handleVoltar();
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao cadastrar',
          text2: resultado.message || 'Não foi possível cadastrar o paciente',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Ocorreu um erro ao cadastrar o paciente',
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

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

          <Text style={styles.title}>Cadastro de Paciente</Text>
          <Text style={styles.subtitle}>Preencha os dados do paciente</Text>

          <View style={styles.formContainer}>
            <CustomInput
              placeholder="Nome completo *"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => cpfInputRef.current?.focus()}
            />

            <CustomInput
              ref={cpfInputRef}
              placeholder="CPF *"
              value={cpf}
              onChangeText={(text) => setCpf(formatarCPF(text))}
              keyboardType="numeric"
              maxLength={14}
              returnKeyType="next"
              onSubmitEditing={() => dataNascimentoInputRef.current?.focus()}
            />

            <CustomInput
              ref={dataNascimentoInputRef}
              placeholder="Data de Nascimento (DD/MM/AAAA) *"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(formatarData(text))}
              keyboardType="numeric"
              maxLength={10}
              returnKeyType="next"
              onSubmitEditing={() => telefoneInputRef.current?.focus()}
            />

            <CustomInput
              ref={telefoneInputRef}
              placeholder="Telefone *"
              value={telefone}
              onChangeText={(text) => setTelefone(formatarTelefone(text))}
              keyboardType="phone-pad"
              maxLength={15}
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <CustomInput
              ref={emailInputRef}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => enderecoInputRef.current?.focus()}
            />

            <CustomInput
              ref={enderecoInputRef}
              placeholder="Endereço"
              value={endereco}
              onChangeText={setEndereco}
              autoCapitalize="words"
              returnKeyType="done"
              onSubmitEditing={handleCadastrar}
            />

            <CustomButton
              title={loading ? "Cadastrando..." : "Cadastrar Paciente"}
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
