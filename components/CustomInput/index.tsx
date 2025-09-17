import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {
  // Aqui podemos adicionar props adicionais específicas do nosso input
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ style, placeholderTextColor = "#rgba(255, 255, 255, 0.7)", ...rest }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
    );
  }
);
