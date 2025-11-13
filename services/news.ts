// Importação da biblioteca HTTP para fazer requisições - biblioteca externa
import axios from 'axios';

/**
 * Interface que define a estrutura de uma notícia
 * Contém apenas as propriedades utilizadas na aplicação
 */
export interface NewsArticle {
  source: {
    name: string;
  };
  title: string;
  description: string;
  url: string;
  publishedAt: string;
}

/**
 * Interface para a resposta da API
 */
interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

/**
 * Configuração da instância do Axios para NewsAPI
 * NewsAPI: https://newsapi.org/
 */
const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

/**
 * Chave da API da NewsAPI
 */
const API_KEY = '383f509be7e7493a9828c4ecb3b00fdb';

/**
 * Serviço de Notícias
 * Centraliza todas as operações relacionadas ao consumo de notícias sobre saúde
 */
export const newsService = {
  /**
   * Busca notícias relacionadas à saúde em português
   * @param pageSize - Número de notícias a retornar (padrão: 5, máximo: 100)
   * @returns Objeto com sucesso/falha e array de notícias ou mensagem de erro
   */
  async getHealthNews(pageSize: number = 5) {
    try {
      const response = await newsApi.get<NewsAPIResponse>('/everything', {
        params: {
          q: '(saúde OR medicina OR médico OR hospital OR doença OR tratamento OR vacina OR SUS OR "sistema de saúde") AND NOT (famoso OR celebridade OR artista OR cantor)', // Busca específica de saúde, excluindo celebridades
          language: 'pt', // Notícias em português
          sortBy: 'relevancy', // Ordenar por relevância para obter conteúdo mais relacionado
          pageSize: pageSize, // Número de resultados
          apiKey: API_KEY,
        },
      });

      if (response.data.status === 'ok') {
        // Filtro adicional para garantir que as notícias são realmente sobre saúde
        const healthKeywords = [
          'saúde', 'médico', 'medicina', 'hospital', 'doença', 'tratamento',
          'vacina', 'sus', 'paciente', 'clínica', 'sintoma', 'diagnóstico',
          'covid', 'dengue', 'gripe', 'vírus', 'bactéria', 'cirurgia',
          'ministério da saúde', 'anvisa', 'remédio', 'medicamento'
        ];

        const filteredArticles = response.data.articles.filter(article => {
          const titleLower = article.title.toLowerCase();
          const descriptionLower = (article.description || '').toLowerCase();
          
          // Verifica se tem pelo menos uma palavra-chave de saúde
          const hasHealthKeyword = healthKeywords.some(keyword => 
            titleLower.includes(keyword) || descriptionLower.includes(keyword)
          );

          // Palavras para excluir (celebridades, entretenimento)
          const excludeKeywords = [
            'famoso', 'celebridade', 'artista', 'cantor', 'ator', 'atriz',
            'show', 'música', 'reality', 'filme', 'série', 'novela'
          ];

          const hasExcludeKeyword = excludeKeywords.some(keyword =>
            titleLower.includes(keyword) || descriptionLower.includes(keyword)
          );

          return hasHealthKeyword && !hasExcludeKeyword;
        });

        return {
          success: true,
          articles: filteredArticles,
          totalResults: filteredArticles.length,
        };
      }

      return {
        success: false,
        message: 'Não foi possível buscar as notícias',
        articles: [],
      };
    } catch (error: any) {
      console.error('Erro ao buscar notícias:', error);
      
      // Tratamento específico para erros da API
      if (error.response?.status === 426) {
        return {
          success: false,
          message: 'Chave de API inválida ou expirada. Por favor, configure uma chave válida.',
          articles: [],
        };
      }

      if (error.response?.status === 429) {
        return {
          success: false,
          message: 'Limite de requisições atingido. Tente novamente mais tarde.',
          articles: [],
        };
      }

      return {
        success: false,
        message: 'Erro ao buscar notícias. Verifique sua conexão com a internet.',
        articles: [],
      };
    }
  },

  /**
   * Busca as principais notícias de saúde do Brasil
   * @param pageSize - Número de notícias a retornar (padrão: 5)
   * @returns Objeto com sucesso/falha e array de notícias ou mensagem de erro
   */
  async getTopHealthNewsBrazil(pageSize: number = 5) {
    try {
      // Busca mais notícias para ter mais opções após filtrar
      const response = await newsApi.get<NewsAPIResponse>('/top-headlines', {
        params: {
          country: 'br', // Notícias do Brasil
          category: 'health', // Categoria saúde
          pageSize: Math.min(pageSize * 3, 20), // Busca mais para poder filtrar depois
          apiKey: API_KEY,
        },
      });

      if (response.data.status === 'ok') {
        // Mesmo filtro usado na outra função
        const healthKeywords = [
          'saúde', 'médico', 'medicina', 'hospital', 'doença', 'tratamento',
          'vacina', 'sus', 'paciente', 'clínica', 'sintoma', 'diagnóstico',
          'covid', 'dengue', 'gripe', 'vírus', 'bactéria', 'cirurgia',
          'ministério da saúde', 'anvisa', 'remédio', 'medicamento'
        ];

        const excludeKeywords = [
          'famoso', 'celebridade', 'artista', 'cantor', 'ator', 'atriz',
          'show', 'música', 'reality', 'filme', 'série', 'novela'
        ];

        const filteredArticles = response.data.articles.filter(article => {
          const titleLower = article.title.toLowerCase();
          const descriptionLower = (article.description || '').toLowerCase();
          
          const hasHealthKeyword = healthKeywords.some(keyword => 
            titleLower.includes(keyword) || descriptionLower.includes(keyword)
          );

          const hasExcludeKeyword = excludeKeywords.some(keyword =>
            titleLower.includes(keyword) || descriptionLower.includes(keyword)
          );

          return hasHealthKeyword && !hasExcludeKeyword;
        }).slice(0, pageSize); // Retorna apenas o número solicitado após filtrar

        return {
          success: true,
          articles: filteredArticles,
          totalResults: filteredArticles.length,
        };
      }

      return {
        success: false,
        message: 'Não foi possível buscar as notícias',
        articles: [],
      };
    } catch (error: any) {
      console.error('Erro ao buscar notícias principais:', error);
      
      if (error.response?.status === 426) {
        return {
          success: false,
          message: 'Chave de API inválida ou expirada. Por favor, configure uma chave válida.',
          articles: [],
        };
      }

      if (error.response?.status === 429) {
        return {
          success: false,
          message: 'Limite de requisições atingido. Tente novamente mais tarde.',
          articles: [],
        };
      }

      return {
        success: false,
        message: 'Erro ao buscar notícias. Verifique sua conexão com a internet.',
        articles: [],
      };
    }
  },

  /**
   * Formata a data de publicação para exibição
   * @param dateString - Data em formato ISO
   * @returns Data formatada em português
   */
  formatPublishDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return 'Há alguns minutos';
    } else if (diffInHours < 24) {
      return `Há ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInHours < 48) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  },
};
