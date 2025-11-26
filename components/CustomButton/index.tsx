// Importação de componentes nativos do React Native
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
// Importação dos estilos centralizados
import { styles } from '@/styles/components/customButton.styles';

/**
 * Interface para as propriedades do CustomButton
 * Estende TouchableOpacityProps para herdar todas as propriedades do TouchableOpacity
 */
interface CustomButtonProps extends TouchableOpacityProps {
  title: string; // Texto do botão
  variant?: 'primary' | 'link'; // Variação visual do botão
}

/**
 * Componente CustomButton
 * Botão customizado reutilizável com duas variações visuais
 * 
 * Props:
 * - title: Texto exibido no botão
 * - variant: 'primary' (padrão, azul) ou 'link' (texto simples)
 * - style: Estilos adicionais (opcional)
 * - ...rest: Todas as outras props do TouchableOpacity
 */
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
        // Aplica estilo baseado na variante
        variant === 'primary' ? styles.primaryButton : styles.linkButton,
        style // Permite override de estilos
      ]} 
      {...rest} // Espalha outras props do TouchableOpacity
    >
      <Text 
        style={[
          styles.buttonText,
          // Aplica estilo do texto baseado na variante
          variant === 'primary' ? styles.primaryButtonText : styles.linkButtonText
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
