/**
 * Barrel export de todos os estilos centralizados do projeto
 * Facilita a importação de estilos em toda a aplicação
 */

// Estilos da Home
export { styles as homeStyles } from './home.styles';

// Estilos de Autenticação
export { styles as loginStyles } from './auth/login.styles';
export { styles as signupStyles } from './auth/signup.styles';

// Estilos de Componentes
export { styles as confirmCodeStyles } from './components/confirmCode.styles';
export { styles as customButtonStyles } from './components/customButton.styles';
export { styles as customInputStyles } from './components/customInput.styles';

// Estilos da Área Médica
export { styles as cadastroAtendimentoStyles } from './areamedica/cadastro-atendimento.styles';
export { styles as cadastroFuncionarioStyles } from './areamedica/cadastro-funcionario.styles';
export { styles as cadastroPacienteStyles } from './areamedica/cadastro-paciente.styles';
export { styles as dashboardStyles } from './areamedica/dashboard.styles';
export { styles as listaAtendimentosStyles } from './areamedica/lista-atendimentos.styles';

