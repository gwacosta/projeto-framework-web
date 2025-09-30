// Importação da API de estilos do React Native
import { StyleSheet } from 'react-native';

/**
 * Estilos para o componente CustomInput
 * Define aparência consistente para campos de entrada em toda a aplicação
 */
export const styles = StyleSheet.create({
  // Estilo do campo de entrada
  input: {
    backgroundColor: '#f8f9fa', // Fundo cinza claro
    borderWidth: 1,
    borderColor: '#e9ecef', // Borda cinza clara
    borderRadius: 8, // Bordas arredondadas
    padding: 15, // Espaçamento interno
    marginBottom: 15, // Espaçamento entre campos
    color: '#2c3e50', // Cor do texto escuro
    fontSize: 16, // Tamanho da fonte
  },
});
