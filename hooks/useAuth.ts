// Importação de hooks do React
import { useEffect, useState } from 'react';
// Importação do serviço de autenticação (caminho: services/auth.ts)
import { authService } from '../services/auth';

/**
 * Hook customizado para gerenciamento de autenticação
 * 
 * Centraliza a lógica de verificação do estado de autenticação
 * Utilizado em toda a aplicação para controlar acesso às telas
 * 
 * Retorna:
 * - isLoggedIn: boolean indicando se o usuário está autenticado
 * - isLoading: boolean indicando se está verificando o estado de auth
 * - checkAuthStatus: função para revalidar o estado de autenticação
 */
export function useAuth() {
  // Estado para controlar se o usuário está logado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para controlar o carregamento da verificação
  const [isLoading, setIsLoading] = useState(true);

  // Efeito executado na montagem do componente
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * Função para verificar o status de autenticação
   * Consulta o serviço de auth para verificar se há usuário logado
   */
  const checkAuthStatus = async () => {
    try {
      // Chama o serviço para obter usuário atual (services/auth.ts)
      const user = await authService.getCurrentUser();
      // Converte para boolean - true se há usuário, false se null/undefined
      setIsLoggedIn(!!user);
    } catch (error) {
      // Em caso de erro, considera como não autenticado
      setIsLoggedIn(false);
    } finally {
      // Sempre finaliza o estado de carregamento
      setIsLoading(false);
    }
  };

  return {
    isLoggedIn,
    isLoading,
    checkAuthStatus,
  };
}
