# Estilos Centralizados

Esta pasta contém todos os estilos da aplicação organizados por módulo.

## Estrutura

```
styles/
├── index.ts                          # Barrel export de todos os estilos
├── README.md                         # Documentação
├── home.styles.ts                    # Estilos da tela inicial
├── auth/                             # Estilos de autenticação
│   ├── login.styles.ts
│   └── signup.styles.ts
├── components/                       # Estilos de componentes
│   ├── confirmCode.styles.ts
│   ├── customButton.styles.ts
│   └── customInput.styles.ts
└── areamedica/                       # Estilos da área médica
    ├── dashboard.styles.ts
    ├── cadastro-paciente.styles.ts
    ├── cadastro-funcionario.styles.ts
    ├── cadastro-atendimento.styles.ts
    └── lista-atendimentos.styles.ts
```

## Como usar

### Importação direta
```typescript
import { styles } from '@/styles/auth/login.styles';
```

### Importação via barrel export (index.ts)
```typescript
import { loginStyles, signupStyles } from '@/styles';
```

## Convenções

1. **Nomenclatura**: Cada arquivo de estilo usa o padrão `[nome].styles.ts`
2. **Export**: Todos exportam um objeto `styles` criado com `StyleSheet.create()`
3. **Comentários**: Cada propriedade de estilo possui comentário descritivo
4. **Organização**: Agrupados por funcionalidade/módulo

## Benefícios da Centralização

✅ **Manutenibilidade**: Estilos em um único local, fácil de encontrar e modificar  
✅ **Reutilização**: Evita duplicação de código  
✅ **Consistência**: Facilita manter padrões visuais  
✅ **Performance**: Permite otimizações futuras (ex: temas)  
✅ **Organização**: Código mais limpo e separação de responsabilidades
