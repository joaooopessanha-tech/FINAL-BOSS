# Guia de Uso - MTG Ranker

## 🚀 Iniciando o Projeto

### 1. Instalação de Dependências

As dependências já foram instaladas, mas se precisar instalar novamente:

```bash
npm install
```

### 2. Executar em Modo de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### 3. Build para Produção

```bash
npm run build
```

### 4. Executar em Produção

```bash
npm start
```

## 📱 Recursos da Aplicação

### Filtros Disponíveis

1. **Ano**: Selecione um ano entre 1995 e o ano atual
2. **Mês**: Escolha um mês específico para filtrar cartas lançadas naquele período
3. **Categoria**:
   - Todas as Categorias (por período)
   - Raridades: Mítica, Rara, Incomum, Comum
   - Cores: Branco, Azul, Preto, Vermelho, Verde

### Informações Exibidas por Carta

- **Ranking**: Posição na lista (1º, 2º, 3º, etc.)
- **Nome**: Nome da carta
- **Tipo**: Tipo da carta (Criatura, Feitiço, etc.)
- **Raridade**: Nível de raridade com cor visual
- **Data de Lançamento**: Data em formato brasileiro (DD/MM/AAAA)
- **CMC**: Custo de Mana Convertido
- **Poder/Resistência**: Apenas para criaturas (P/R)
- **Cores**: Círculos de cor (Branco, Azul, Preto, Vermelho, Verde)
- **Preço**: Valor em USD quando disponível
- **Texto do Oracle**: Descrição curta do efeito da carta

## 🛠️ Estrutura do Projeto

```
src/
├── app/                    # Roteamento Next.js
│   ├── layout.tsx         # Layout raiz com meta tags SEO
│   ├── page.tsx           # Página principal
│   ├── globals.css        # Estilos globais Tailwind
│   ├── sitemap.ts         # Sitemap para SEO
│   ├── robots.ts          # Robots.txt para SEO
│   └── manifest.ts        # Web App Manifest
├── components/            # Componentes React
│   ├── CardRanker.tsx     # Componente principal
│   ├── CardRow.tsx        # Card individual da carta
│   ├── FilterBar.tsx      # Barra de filtros
│   ├── Header.tsx         # Cabeçalho da página
│   ├── Footer.tsx         # Rodapé
│   └── index.ts           # Exportações
├── lib/
│   └── api.ts             # Funções de chamada da API Scryfall
├── hooks/
│   └── useCards.ts        # Hook customizado para gerenciar cartas
├── types/
│   └── scryfall.ts        # Definições de tipos TypeScript
├── package.json           # Dependências
├── tsconfig.json          # Configuração TypeScript
├── tailwind.config.ts     # Configuração Tailwind
├── next.config.js         # Configuração Next.js
└── postcss.config.js      # Configuração PostCSS
```

## 🎨 Customização

### Cores Tailwind

Para alterar as cores principais, edite `tailwind.config.ts`:

```typescript
colors: {
  primary: '#1a1a2e',      // Azul escuro
  secondary: '#16213e',    // Azul médio
  accent: '#0f3460',       // Azul claro
  gold: '#edc53f',         // Dourado
  silver: '#a8a9ad',       // Prata
}
```

### Animações Customizadas

Disponíveis em `tailwind.config.ts`:

- `fade-in`: Desvanecimento suave (0.5s)
- `slide-up`: Deslizamento para cima (0.6s)
- `glow`: Efeito de brilho em loop (2s)

### Breakpoints Responsivos

Os breakpoints do Tailwind já estão configurados:

```
sm:  640px   (tablets pequenos)
md:  768px   (tablets)
lg:  1024px  (desktops pequenos)
xl:  1280px  (desktops grandes)
```

## 🔍 Dicas de Uso

1. **Primeiros Resultados**: A aplicação carrega cartas do mês/ano atual por padrão
2. **Performance**: Os resultados são limites a 50 cartas por busca (limite da API)
3. **Cache**: Use o cache do navegador para melhor performance em buscas repetidas
4. **Mobile**: Interface totalmente otimizada para mobile, sem necessidade de scroll horizontal

## 🐛 Troubleshooting

### Nenhuma carta aparece

- Verifique a conexão com internet
- A API Scryfall pode estar indisponível
- Tente um período diferente (às vezes meses antigos têm menos dados)

### Performance lenta

- Limpe o cache do navegador
- Feche outras abas/aplicações pesadas
- Tente filtrar por categoria mais específica

### Erro "Failed to fetch"

- Espere alguns segundos e tente novamente
- A API Scryfall tem rate limiting de 120 requisições por minuto

## 📊 Dados da API

A aplicação usa a **API Scryfall** (https://scryfall.com/):

- Totalmente gratuita e sem autenticação
- Dados em tempo real de Magic The Gathering
- Atualizada regularmente com novos lançamentos

### Endpoints Utilizados

```
GET /cards/search?q=<query>
- Busca cartas com filtros
- Parâmetros:
  - q: Query (ex: "released:2024-01-01 to 2024-01-31")
  - order: Ordenação (usd, cmc, power, etc.)
  - dir: Direção (asc, desc)
  - unique: Unicidade (prints, cards)
  - page: Número da página
```

## ♿ Acessibilidade

A aplicação foi construída com acessibilidade em mente:

- Contraste adequado de cores
- Labels descritivas em inputs
- Suporte a navegação por teclado
- Sem conteúdo que pisca mais de 3 vezes por segundo
- Estrutura semântica de HTML

## 📈 Performance

Métricas de Performance:

- **First Load JS**: ~115 kB
- **Build Size**: ~27.6 kB por página
- **CSS**: ~1.92 kB (compartilhado)
- **Lazy Loading**: Implementado para imagens
- **Code Splitting**: Automático do Next.js

## 🔐 SEO

A aplicação inclui:

- ✅ Meta tags descritivas
- ✅ Open Graph tags (compartilhamento social)
- ✅ Twitter Cards
- ✅ Schema JSON-LD
- ✅ Sitemap dinâmico
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Responsive meta viewport

## 🌐 Deployment

A aplicação pode ser deployada em:

### Vercel (Recomendado para Next.js)

```bash
npm install -g vercel
vercel
```

### Outras Plataformas

1. **Netlify**: Exporte como static site (`npm run build`)
2. **AWS Amplify**: Deploy automático via GitHub
3. **Docker**: Crie uma imagem Docker
4. **Railway, Render, Heroku**: Suportam Node.js

## 📞 Suporte

Para dúvidas ou relatórios de bugs:

1. Verifique a documentação
2. Consulte o Scryfall Docs: https://scryfall.com/docs/api
3. Abra uma issue no repositório do projeto

---

**Desenvolvido com ❤️ para a comunidade Magic The Gathering**
