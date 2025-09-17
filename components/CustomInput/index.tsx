import { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

interface CustomInputProps extends TextInputProps {
  // Aqui podemos adicionar props adicionais específicas do nosso input
}

export const CustomInput = forwardRef<TextInput, CustomInputProps>(
  ({ style, placeholderTextColor = "#95a5a6", ...rest }, ref) => {
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
