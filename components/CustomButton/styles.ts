// Importação da API de estilos do React Native
import { StyleSheet } from 'react-native';

/**
 * Estilos para o componente CustomButton
 * Define variações visuais para botões primários e de link
 */
export const styles = StyleSheet.create({
  // Estilo base do botão (aplicado a todas as variantes)
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  // Variante primária - botão azul sólido
  primaryButton: {
    backgroundColor: '#3498db',
  },
  // Variante link - botão transparente
  linkButton: {
    backgroundColor: 'transparent',
    padding: 0,
  },
  // Estilo base do texto do botão
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Texto do botão primário - branco para contraste com fundo azul
  primaryButtonText: {
    color: '#ffffff',
  },
  // Texto do botão link - azul com sublinhado
  linkButtonText: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
});
