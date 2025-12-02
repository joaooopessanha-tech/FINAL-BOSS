# Ambiente de Desenvolvimento

## Pré-requisitos

- Node.js 18+ (recomendado 20 LTS)
- npm 9+ ou yarn 3+
- Editor: Visual Studio Code (recomendado)

## Extensões VS Code Recomendadas

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "prisma.prisma"
  ]
}
```

Instale com: `code --install-extension <extension-id>`

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API Scryfall (pública, não necessário configurar)
# NEXT_PUBLIC_SCRYFALL_API=https://api.scryfall.com

# Variáveis de Build
NODE_ENV=development
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## Scripts npm

```bash
npm run dev       # Iniciar servidor de desenvolvimento (port 3000)
npm run build     # Build para produção
npm start         # Iniciar servidor de produção
npm run lint      # Executar ESLint
npm run type-check # Verificar tipos TypeScript
npm run format    # Formatar código (se Prettier configurado)
```

## Modo de Desenvolvimento

Para debug avançado:

```bash
# Ativa verbose logging
npm run dev -- --debug

# Inicia em uma porta específica
npm run dev -- -p 3001
```

## Debugging no VS Code

Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/next",
      "runtimeArgs": ["dev"],
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Performance Testing

### Lighthouse Audit

```bash
# Via Chrome DevTools
# 1. Abra http://localhost:3000
# 2. DevTools > Lighthouse > Analyze page load

# Via CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Bundle Analysis

```bash
npm run build -- --analyze
# ou use o @next/bundle-analyzer
```

## Testing

Embora não tenha testes configurados por padrão, aqui está como adicionar:

### Jest + React Testing Library

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# Crie jest.config.js
```

## Git Hooks

Configure Husky para validação de commits:

```bash
npm install husky
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

## Troubleshooting

### Porta 3000 já em uso

```powershell
# Windows - Encontrar processo
netstat -ano | findstr :3000

# Matar processo
taskkill /PID <PID> /F

# Ou usar porta diferente
npm run dev -- -p 3001
```

### Rebuild necessário

```bash
# Limpar cache
rm -r .next node_modules
npm install
npm run dev
```

### TypeScript errors

```bash
# Forçar recompilação
npm run build

# Sem strict mode (temporário para debug)
# Edite tsconfig.json e mude "strict": false
```

## Hot Reload

O Next.js tem Fast Refresh automático. Se não funcionar:

1. Salve o arquivo novamente
2. Verifique o console para erros
3. Restart do servidor: `Ctrl+C` e `npm run dev`

## Database (Futuro)

Se precisar adicionar banco de dados:

```bash
# Exemplo com Prisma
npm install @prisma/client
npm install -D prisma

npx prisma init
```

## Monitoramento em Tempo Real

### Terminal com Watch

```bash
npm run dev

# Output típico:
# ▲ Next.js 14.2.33
# - Local:        http://localhost:3000
# - Environments: .env, .env.local
```

### Observar Mudanças

```bash
# Arquivo específico
npm run dev -- --watch src/components/CardRow.tsx
```

## CI/CD

### GitHub Actions

Crie `.github/workflows/build.yml`:

```yaml
name: Build and Test

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

## Recursos Adicionais

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Scryfall API](https://scryfall.com/docs/api)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
