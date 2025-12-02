# MTG Ranker - Magic The Gathering Card Analyzer

## 📋 Descrição

MTG Ranker é uma aplicação web moderna desenvolvida em React + Next.js com Tailwind CSS que permite explorar e classificar as melhores cartas de Magic The Gathering. A aplicação integra a API Scryfall para fornecer dados em tempo real sobre cartas, raridades e categorias.

### Características Principais

- ✨ **Interface Moderna**: Design elegante com gradientes, animações e tema dark/gold
- 📊 **Filtros Avançados**: Filtrar por ano, mês e categorias (raridade, cor)
- 🎯 **Dados em Tempo Real**: Integração completa com API Scryfall
- 📱 **Responsivo**: Totalmente adaptável para mobile, tablet e desktop
- ♿ **Acessível**: Construído com princípios de acessibilidade
- 🔍 **SEO Otimizado**: Meta tags, schema JSON-LD e sitemap
- ⚡ **Performance**: Lazy loading e otimizações Next.js

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript
- **Next.js 14** - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3** - Framework CSS utilitário
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones SVG
- **Scryfall API** - API de dados de cartas MTG

## 📦 Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd mtg-ranker

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```

## 🛠️ Desenvolvimento

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Cria build para produção
npm start        # Inicia a aplicação em produção
npm run lint     # Executa ESLint
```

### Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx          # Layout raiz com meta tags
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── CardRanker.tsx      # Componente principal
│   ├── CardRow.tsx         # Card individual
│   ├── FilterBar.tsx       # Barra de filtros
│   ├── Header.tsx          # Cabeçalho
│   └── Footer.tsx          # Rodapé
└── lib/
    └── api.ts              # Chamadas da API Scryfall
```

## 🎨 Personalização

### Cores do Tailwind

As cores primárias podem ser personalizadas em `tailwind.config.ts`:

```typescript
colors: {
  primary: '#1a1a2e',
  secondary: '#16213e',
  accent: '#0f3460',
  gold: '#edc53f',
  silver: '#a8a9ad',
}
```

### Animações Customizadas

- `fade-in`: Desvanecimento suave
- `slide-up`: Deslizamento para cima
- `glow`: Efeito de brilho

## 🔐 SEO

A aplicação inclui:

- Meta tags semânticas
- Open Graph tags para compartilhamento social
- Twitter Cards
- Schema JSON-LD para buscadores
- Sitemap automático
- Canonical URLs
- robots.txt

## 📱 Responsividade

Breakpoints Tailwind utilizados:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

A aplicação adapta layout, tipografia e espaçamento para cada tamanho de tela.

## 🌐 API Scryfall

### Endpoints Utilizados

- `GET /cards/search` - Buscar cartas com filtros
- Parâmetros:
  - `q`: Query de busca (e.g., `released:2024-01-01 to 2024-01-31`)
  - `order`: Ordenação (`usd`, `cmc`, etc.)
  - `dir`: Direção (`asc`, `desc`)
  - `unique`: Unicidade (`prints`, `cards`)

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local`:

```env
# Não necessário por enquanto, API Scryfall é pública
```

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro ao buscar cartas

- Verifique conexão com internet
- A API Scryfall pode ter rate limiting (120 requisições/min)
- Tente filtros menos específicos

## 📈 Performance

- Código splitting automático do Next.js
- Lazy loading de imagens
- Otimização CSS com Tailwind
- Minificação em produção

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é licenciado sob a MIT License.

## 🙏 Agradecimentos

- [Scryfall](https://scryfall.com/) pelos dados de cartas
- [Wizards of the Coast](https://company.wizards.com/) por Magic: The Gathering
- [Tailwind Labs](https://tailwindlabs.com/) pelo Tailwind CSS
- [Vercel](https://vercel.com/) pelo Next.js

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade MTG**
