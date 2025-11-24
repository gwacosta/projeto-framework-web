// Importação da biblioteca HTTP para fazer requisições - biblioteca externa
import axios from 'axios';

/**
 * Interface que define a estrutura de um paciente
 */
export interface Paciente {
  id?: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  email: string;
  endereco: string;
  criadoEm?: string;
}

/**
 * Configuração da instância do Axios para a API
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Serviço de Pacientes
 * Centraliza todas as operações relacionadas ao gerenciamento de pacientes
 */
export const pacientesService = {
  /**
   * Lista todos os pacientes
   * @returns Objeto com sucesso/falha e array de pacientes
   */
  async listar() {
    try {
      const response = await api.get<Paciente[]>('/pacientes');
      return {
        success: true,
        pacientes: response.data,
      };
    } catch (error) {
      console.error('Erro ao listar pacientes:', error);
      return {
        success: false,
        message: 'Erro ao buscar pacientes',
        pacientes: [],
      };
    }
  },

  /**
   * Busca um paciente por ID
   * @param id - ID do paciente
   * @returns Objeto com sucesso/falha e dados do paciente
   */
  async buscarPorId(id: string) {
    try {
      const response = await api.get<Paciente>(`/pacientes/${id}`);
      return {
        success: true,
        paciente: response.data,
      };
    } catch (error) {
      console.error('Erro ao buscar paciente:', error);
      return {
        success: false,
        message: 'Paciente não encontrado',
      };
    }
  },

  /**
   * Cria um novo paciente
   * @param paciente - Dados do paciente
   * @returns Objeto com sucesso/falha e dados do paciente criado
   */
  async criar(paciente: Omit<Paciente, 'id' | 'criadoEm'>) {
    try {
      // Verifica se CPF já está cadastrado
      const existente = await api.get('/pacientes', {
        params: { cpf: paciente.cpf },
      });

      if (existente.data.length > 0) {
        return {
          success: false,
          message: 'CPF já cadastrado',
        };
      }

      const novoPaciente = {
        ...paciente,
        criadoEm: new Date().toISOString(),
      };

      const response = await api.post<Paciente>('/pacientes', novoPaciente);
      return {
        success: true,
        paciente: response.data,
        message: 'Paciente cadastrado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar paciente',
      };
    }
  },

  /**
   * Atualiza um paciente existente
   * @param id - ID do paciente
   * @param paciente - Dados atualizados do paciente
   * @returns Objeto com sucesso/falha e dados do paciente atualizado
   */
  async atualizar(id: string, paciente: Partial<Paciente>) {
    try {
      const response = await api.patch<Paciente>(`/pacientes/${id}`, paciente);
      return {
        success: true,
        paciente: response.data,
        message: 'Paciente atualizado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      return {
        success: false,
        message: 'Erro ao atualizar paciente',
      };
    }
  },

  /**
   * Remove um paciente
   * @param id - ID do paciente
   * @returns Objeto com sucesso/falha
   */
  async remover(id: string) {
    try {
      await api.delete(`/pacientes/${id}`);
      return {
        success: true,
        message: 'Paciente removido com sucesso',
      };
    } catch (error) {
      console.error('Erro ao remover paciente:', error);
      return {
        success: false,
        message: 'Erro ao remover paciente',
      };
    }
  },
};
