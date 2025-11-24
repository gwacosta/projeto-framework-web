// Importação da biblioteca HTTP para fazer requisições - biblioteca externa
import axios from 'axios';

/**
 * Interface que define a estrutura de um funcionário
 */
export interface Funcionario {
  id?: string;
  nome: string;
  cpf: string;
  especialidade?: string;
  crm?: string;
  telefone: string;
  email: string;
  tipo: 'medico' | 'enfermeiro' | 'recepcionista' | 'outro';
  criadoEm?: string;
}

/**
 * Configuração da instância do Axios para a API
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Serviço de Funcionários
 * Centraliza todas as operações relacionadas ao gerenciamento de funcionários
 */
export const funcionariosService = {
  /**
   * Lista todos os funcionários
   * @returns Objeto com sucesso/falha e array de funcionários
   */
  async listar() {
    try {
      const response = await api.get<Funcionario[]>('/funcionarios');
      return {
        success: true,
        funcionarios: response.data,
      };
    } catch (error) {
      console.error('Erro ao listar funcionários:', error);
      return {
        success: false,
        message: 'Erro ao buscar funcionários',
        funcionarios: [],
      };
    }
  },

  /**
   * Lista apenas médicos
   * @returns Objeto com sucesso/falha e array de médicos
   */
  async listarMedicos() {
    try {
      const response = await api.get<Funcionario[]>('/funcionarios', {
        params: { tipo: 'medico' },
      });
      return {
        success: true,
        funcionarios: response.data,
      };
    } catch (error) {
      console.error('Erro ao listar médicos:', error);
      return {
        success: false,
        message: 'Erro ao buscar médicos',
        funcionarios: [],
      };
    }
  },

  /**
   * Busca um funcionário por ID
   * @param id - ID do funcionário
   * @returns Objeto com sucesso/falha e dados do funcionário
   */
  async buscarPorId(id: string) {
    try {
      const response = await api.get<Funcionario>(`/funcionarios/${id}`);
      return {
        success: true,
        funcionario: response.data,
      };
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      return {
        success: false,
        message: 'Funcionário não encontrado',
      };
    }
  },

  /**
   * Cria um novo funcionário
   * @param funcionario - Dados do funcionário
   * @returns Objeto com sucesso/falha e dados do funcionário criado
   */
  async criar(funcionario: Omit<Funcionario, 'id' | 'criadoEm'>) {
    try {
      // Verifica se CPF já está cadastrado
      const existente = await api.get('/funcionarios', {
        params: { cpf: funcionario.cpf },
      });

      if (existente.data.length > 0) {
        return {
          success: false,
          message: 'CPF já cadastrado',
        };
      }

      const novoFuncionario = {
        ...funcionario,
        criadoEm: new Date().toISOString(),
      };

      const response = await api.post<Funcionario>('/funcionarios', novoFuncionario);
      return {
        success: true,
        funcionario: response.data,
        message: 'Funcionário cadastrado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar funcionário',
      };
    }
  },

  /**
   * Atualiza um funcionário existente
   * @param id - ID do funcionário
   * @param funcionario - Dados atualizados do funcionário
   * @returns Objeto com sucesso/falha e dados do funcionário atualizado
   */
  async atualizar(id: string, funcionario: Partial<Funcionario>) {
    try {
      const response = await api.patch<Funcionario>(`/funcionarios/${id}`, funcionario);
      return {
        success: true,
        funcionario: response.data,
        message: 'Funcionário atualizado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      return {
        success: false,
        message: 'Erro ao atualizar funcionário',
      };
    }
  },

  /**
   * Remove um funcionário
   * @param id - ID do funcionário
   * @returns Objeto com sucesso/falha
   */
  async remover(id: string) {
    try {
      await api.delete(`/funcionarios/${id}`);
      return {
        success: true,
        message: 'Funcionário removido com sucesso',
      };
    } catch (error) {
      console.error('Erro ao remover funcionário:', error);
      return {
        success: false,
        message: 'Erro ao remover funcionário',
      };
    }
  },
};
