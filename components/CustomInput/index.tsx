// Importação do forwardRef para permitir ref no componente
import { forwardRef } from 'react';
// Importação de componentes nativos do React Native
import { TextInput, TextInputProps } from 'react-native';
// Importação dos estilos centralizados
import { styles } from '@/styles/components/customInput.styles';

/**
 * Interface para as propriedades do CustomInput
 * Estende TextInputProps para herdar todas as propriedades do TextInput
 */
interface CustomInputProps extends TextInputProps {
  // Aqui podemos adicionar props adicionais específicas do nosso input
  // Por enquanto, apenas estende as props padrão do TextInput
}

/**
 * Componente CustomInput
 * Campo de entrada customizado reutilizável
 * 
 * Utiliza forwardRef para permitir acesso direto ao TextInput via ref
 * Útil para navegação entre campos com o teclado
 * 
 * Props:
 * - style: Estilos adicionais (opcional)
 * - placeholderTextColor: Cor do placeholder (padrão: cinza)
 * - ...rest: Todas as outras props do TextInput
 * - ref: Referência para o TextInput nativo
 */
export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ style, placeholderTextColor = "#95a5a6", ...rest }, ref) => {
    return (
      <TextInput
        ref={ref} // Encaminha a ref para o TextInput nativo
        style={[styles.input, style]} // Combina estilos padrão com customizações
        placeholderTextColor={placeholderTextColor} // Cor padrão do placeholder
        {...rest} // Espalha outras props do TextInput
      />
    );
  }
);
