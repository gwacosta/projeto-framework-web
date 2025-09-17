import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'link';
}

export function CustomButton({ 
  title, 
  variant = 'primary',
  style,
  ...rest 
}: CustomButtonProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.linkButton,
        style
      ]} 
      {...rest}
    >
      <Text 
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : styles.linkButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
