// Importação da biblioteca HTTP para fazer requisições - biblioteca externa
import axios from 'axios';
import { Funcionario } from './funcionarios';
import { Paciente } from './pacientes';

/**
 * Interface que define a estrutura de um atendimento
 */
export interface Atendimento {
  id?: string;
  pacienteId: string;
  funcionarioId: string;
  data: string;
  horario: string;
  tipo: 'Consulta' | 'Retorno' | 'Exame' | 'Urgência';
  status: 'agendado' | 'em_atendimento' | 'concluido' | 'cancelado';
  observacoes?: string;
  criadoEm?: string;
}

/**
 * Interface estendida com dados completos do paciente e funcionário
 */
export interface AtendimentoCompleto extends Atendimento {
  paciente?: Paciente;
  funcionario?: Funcionario;
}

/**
 * Configuração da instância do Axios para a API
 */
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Serviço de Atendimentos
 * Centraliza todas as operações relacionadas ao gerenciamento de atendimentos
 */
export const atendimentosService = {
  /**
   * Lista todos os atendimentos
   * @param incluirRelacionamentos - Se deve incluir dados de paciente e funcionário
   * @returns Objeto com sucesso/falha e array de atendimentos
   */
  async listar(incluirRelacionamentos: boolean = false) {
    try {
      const response = await api.get<Atendimento[]>('/atendimentos');
      let atendimentos = response.data;

      if (incluirRelacionamentos) {
        const atendimentosCompletos = await Promise.all(
          atendimentos.map(async (atendimento) => {
            const [pacienteRes, funcionarioRes] = await Promise.all([
              api.get<Paciente>(`/pacientes/${atendimento.pacienteId}`),
              api.get<Funcionario>(`/funcionarios/${atendimento.funcionarioId}`),
            ]);

            return {
              ...atendimento,
              paciente: pacienteRes.data,
              funcionario: funcionarioRes.data,
            } as AtendimentoCompleto;
          })
        );

        return {
          success: true,
          atendimentos: atendimentosCompletos,
        };
      }

      return {
        success: true,
        atendimentos,
      };
    } catch (error) {
      console.error('Erro ao listar atendimentos:', error);
      return {
        success: false,
        message: 'Erro ao buscar atendimentos',
        atendimentos: [],
      };
    }
  },

  /**
   * Lista atendimentos de uma data específica
   * @param data - Data no formato YYYY-MM-DD
   * @param incluirRelacionamentos - Se deve incluir dados de paciente e funcionário
   * @returns Objeto com sucesso/falha e array de atendimentos
   */
  async listarPorData(data: string, incluirRelacionamentos: boolean = true) {
    try {
      const response = await api.get<Atendimento[]>('/atendimentos', {
        params: { data },
      });

      let atendimentos = response.data;

      // Ordena por horário
      atendimentos = atendimentos.sort((a, b) => a.horario.localeCompare(b.horario));

      if (incluirRelacionamentos) {
        const atendimentosCompletos = await Promise.all(
          atendimentos.map(async (atendimento) => {
            const [pacienteRes, funcionarioRes] = await Promise.all([
              api.get<Paciente>(`/pacientes/${atendimento.pacienteId}`),
              api.get<Funcionario>(`/funcionarios/${atendimento.funcionarioId}`),
            ]);

            return {
              ...atendimento,
              paciente: pacienteRes.data,
              funcionario: funcionarioRes.data,
            } as AtendimentoCompleto;
          })
        );

        return {
          success: true,
          atendimentos: atendimentosCompletos,
        };
      }

      return {
        success: true,
        atendimentos,
      };
    } catch (error) {
      console.error('Erro ao listar atendimentos por data:', error);
      return {
        success: false,
        message: 'Erro ao buscar atendimentos',
        atendimentos: [],
      };
    }
  },

  /**
   * Busca os próximos N atendimentos a partir da data/hora atual
   * @param limite - Número de atendimentos a retornar
   * @returns Objeto com sucesso/falha e array de atendimentos
   */
  async proximosAtendimentos(limite: number = 3) {
    try {
      const agora = new Date();
      const dataHoje = agora.toISOString().split('T')[0];
      const horaAtual = agora.toTimeString().split(' ')[0].substring(0, 5);

      const response = await api.get<Atendimento[]>('/atendimentos', {
        params: { data: dataHoje, status: 'agendado' },
      });

      // Filtra atendimentos futuros e ordena por horário
      let atendimentos = response.data
        .filter(atendimento => atendimento.horario >= horaAtual)
        .sort((a, b) => a.horario.localeCompare(b.horario))
        .slice(0, limite);

      // Busca informações completas
      const atendimentosCompletos = await Promise.all(
        atendimentos.map(async (atendimento) => {
          const [pacienteRes, funcionarioRes] = await Promise.all([
            api.get<Paciente>(`/pacientes/${atendimento.pacienteId}`),
            api.get<Funcionario>(`/funcionarios/${atendimento.funcionarioId}`),
          ]);

          return {
            ...atendimento,
            paciente: pacienteRes.data,
            funcionario: funcionarioRes.data,
          } as AtendimentoCompleto;
        })
      );

      return {
        success: true,
        atendimentos: atendimentosCompletos,
      };
    } catch (error) {
      console.error('Erro ao buscar próximos atendimentos:', error);
      return {
        success: false,
        message: 'Erro ao buscar próximos atendimentos',
        atendimentos: [],
      };
    }
  },

  /**
   * Busca um atendimento por ID
   * @param id - ID do atendimento
   * @returns Objeto com sucesso/falha e dados do atendimento
   */
  async buscarPorId(id: string) {
    try {
      const response = await api.get<Atendimento>(`/atendimentos/${id}`);
      return {
        success: true,
        atendimento: response.data,
      };
    } catch (error) {
      console.error('Erro ao buscar atendimento:', error);
      return {
        success: false,
        message: 'Atendimento não encontrado',
      };
    }
  },

  /**
   * Cria um novo atendimento
   * @param atendimento - Dados do atendimento
   * @returns Objeto com sucesso/falha e dados do atendimento criado
   */
  async criar(atendimento: Omit<Atendimento, 'id' | 'criadoEm'>) {
    try {
      // Verifica conflito de horário
      const conflitos = await api.get('/atendimentos', {
        params: {
          funcionarioId: atendimento.funcionarioId,
          data: atendimento.data,
          horario: atendimento.horario,
        },
      });

      if (conflitos.data.length > 0) {
        return {
          success: false,
          message: 'Já existe um atendimento agendado para este horário',
        };
      }

      const novoAtendimento = {
        ...atendimento,
        status: 'agendado',
        criadoEm: new Date().toISOString(),
      };

      const response = await api.post<Atendimento>('/atendimentos', novoAtendimento);
      return {
        success: true,
        atendimento: response.data,
        message: 'Atendimento cadastrado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
      return {
        success: false,
        message: 'Erro ao cadastrar atendimento',
      };
    }
  },

  /**
   * Atualiza um atendimento existente
   * @param id - ID do atendimento
   * @param atendimento - Dados atualizados do atendimento
   * @returns Objeto com sucesso/falha e dados do atendimento atualizado
   */
  async atualizar(id: string, atendimento: Partial<Atendimento>) {
    try {
      const response = await api.patch<Atendimento>(`/atendimentos/${id}`, atendimento);
      return {
        success: true,
        atendimento: response.data,
        message: 'Atendimento atualizado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao atualizar atendimento:', error);
      return {
        success: false,
        message: 'Erro ao atualizar atendimento',
      };
    }
  },

  /**
   * Cancela um atendimento
   * @param id - ID do atendimento
   * @returns Objeto com sucesso/falha
   */
  async cancelar(id: string) {
    try {
      await api.patch(`/atendimentos/${id}`, { status: 'cancelado' });
      return {
        success: true,
        message: 'Atendimento cancelado com sucesso',
      };
    } catch (error) {
      console.error('Erro ao cancelar atendimento:', error);
      return {
        success: false,
        message: 'Erro ao cancelar atendimento',
      };
    }
  },

  /**
   * Remove um atendimento
   * @param id - ID do atendimento
   * @returns Objeto com sucesso/falha
   */
  async remover(id: string) {
    try {
      await api.delete(`/atendimentos/${id}`);
      return {
        success: true,
        message: 'Atendimento removido com sucesso',
      };
    } catch (error) {
      console.error('Erro ao remover atendimento:', error);
      return {
        success: false,
        message: 'Erro ao remover atendimento',
      };
    }
  },
};
