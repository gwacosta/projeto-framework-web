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
// Importação do serviço de funcionários
import { funcionariosService } from "../../services/funcionarios";
// Importação dos estilos centralizados
import { styles } from "../../styles/areamedica/cadastro-funcionario.styles";

/**
 * Tela de Cadastro de Funcionários
 * Permite cadastrar novos funcionários no sistema
 */
export default function CadastroFuncionario() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Refs para navegação entre campos
  const cpfInputRef = useRef<TextInput>(null);
  const especialidadeInputRef = useRef<TextInput>(null);
  const crmInputRef = useRef<TextInput>(null);
  const telefoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

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
   * Valida os campos do formulário
   */
  const validarCampos = (): boolean => {
    if (!nome.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Nome obrigatório',
        text2: 'Por favor, informe o nome do funcionário',
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

    if (!crm.trim()) {
      Toast.show({
        type: 'error',
        text1: 'CRM obrigatório',
        text2: 'Por favor, informe o CRM do médico',
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
   * Função para cadastrar funcionário
   */
  const handleCadastrar = async () => {
    if (!validarCampos()) {
      return;
    }

    setLoading(true);

    try {
      const resultado = await funcionariosService.criar({
        nome: nome.trim(),
        cpf,
        tipo: 'medico',
        especialidade: especialidade.trim() || undefined,
        crm: crm.trim() || undefined,
        telefone,
        email: email.trim(),
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
        setEspecialidade("");
        setCrm("");
        setTelefone("");
        setEmail("");

        // Volta para a tela anterior após 1 segundo
        setTimeout(() => {
          handleVoltar();
        }, 1000);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao cadastrar',
          text2: resultado.message || 'Não foi possível cadastrar o funcionário',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro inesperado',
        text2: 'Ocorreu um erro ao cadastrar o funcionário',
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

          <Text style={styles.title}>Cadastro de Médico</Text>
          <Text style={styles.subtitle}>Preencha os dados do médico</Text>

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
              onSubmitEditing={() => especialidadeInputRef.current?.focus()}
            />

            <CustomInput
              ref={especialidadeInputRef}
              placeholder="Especialidade"
              value={especialidade}
              onChangeText={setEspecialidade}
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => crmInputRef.current?.focus()}
            />

            <CustomInput
              ref={crmInputRef}
              placeholder="CRM *"
              value={crm}
              onChangeText={setCrm}
              autoCapitalize="characters"
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
              placeholder="Email *"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="done"
              onSubmitEditing={handleCadastrar}
            />

            <CustomButton
              title={loading ? "Cadastrando..." : "Cadastrar Funcionário"}
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
