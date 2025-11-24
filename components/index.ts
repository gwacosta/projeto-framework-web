/**
 * Índice de exportação dos componentes
 * Centraliza as exportações de todos os componentes customizados
 * Permite importações mais limpas em outros arquivos
 * 
 * Exemplo de uso:
 * import { CustomInput, CustomButton, ConfirmModal } from '../components';
 * 
 * Em vez de:
 * import { CustomInput } from '../components/CustomInput';
 * import { CustomButton } from '../components/CustomButton';
 * import { ConfirmModal } from '../components/ConfirmModal';
 */

// Exporta todos os exports do CustomInput (caminho: components/CustomInput/index.tsx)
export * from './CustomInput';
// Exporta todos os exports do CustomButton (caminho: components/CustomButton/index.tsx)
export * from './CustomButton';
// Exporta todos os exports do ConfirmModal (caminho: components/ConfirmModal/index.tsx)
export * from './ConfirmModal';
