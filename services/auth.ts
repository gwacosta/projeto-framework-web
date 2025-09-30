// Importação da biblioteca para armazenamento local - biblioteca externa
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importação da biblioteca HTTP para fazer requisições - biblioteca externa
import axios from 'axios';

/**
 * Configuração da instância do Axios
 * Define a URL base para todas as requisições HTTP
 * Em produção, esta URL apontaria para o servidor real
 */
const api = axios.create({
  baseURL: 'http://localhost:3000', // JSON Server local para desenvolvimento
});

/**
 * Interface que define a estrutura de um usuário
 * Usado para tipagem TypeScript em todo o serviço
 */
interface User {
  id?: number; // ID opcional (gerado pelo servidor)
  email: string; // Email obrigatório
  password: string; // Senha obrigatória
  name?: string; // Nome opcional
}

/**
 * Chave constante para armazenamento do token de autenticação
 * Usado no AsyncStorage para persistir dados de login
 */
export const AUTH_TOKEN_KEY = '@auth_token';

/**
 * Serviço de Autenticação
 * Centraliza todas as operações relacionadas à autenticação
 * Comunica com API e gerencia armazenamento local
 */
export const authService = {
  /**
   * Função de login
   * @param email - Email do usuário
   * @param password - Senha do usuário
   * @returns Objeto com sucesso/falha e dados do usuário ou mensagem de erro
   */
  async login(email: string, password: string) {
    try {
      // Busca usuário na API com email e senha (simulação de autenticação)
      const response = await api.get('/users', {
        params: { email, password },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        // Armazena dados do usuário no AsyncStorage
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
        return { success: true, user };
      }
      return { success: false, message: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro' };
    }
  },

  /**
   * Função de cadastro
   * @param userData - Dados do usuário para cadastro
   * @returns Objeto com sucesso/falha e dados do usuário ou mensagem de erro
   */
  async signup(userData: User) {
    try {
      // Verifica se o email já está registrado
      // Esse papel é de responsabilidade do backend em um cenário real
      const existingUser = await api.get('/users', {
        params: { email: userData.email },
      });

      if (existingUser.data.length > 0) {
        return { success: false, message: 'Email já registrado' };
      }

      // Cria novo usuário na API
      const response = await api.post('/users', userData);
      const user = response.data;

      return { success: true, user };
    } catch (error) {
      return { success: false, message: 'Ocorreu um erro durante o registro' };
    }
  },

  /**
   * Função de logout
   * Remove dados de autenticação do armazenamento local
   * @returns Objeto indicando sucesso ou falha da operação
   */
  async logout() {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Erro durante o logout' };
    }
  },

  /**
   * Função para obter usuário atual
   * Recupera dados do usuário logado do armazenamento local
   * @returns Dados do usuário ou null se não estiver logado
   */
  async getCurrentUser() {
    try {
      const userData = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },
};
