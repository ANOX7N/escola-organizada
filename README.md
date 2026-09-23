# Escola Organizada

Aplicação web de produtividade escolar para transformar atividades e projetos em um plano de ação. O primeiro acesso começa sem dados de demonstração: cada atividade, matéria, projeto, etapa e integrante é criado pelo estudante.

## Tecnologias

- React 19 e TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React (ícones)
- LocalStorage, isolado em uma camada de serviço

## Como executar

```bash
npm install
npm run dev
```

Para gerar uma versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura

```text
src/
├── components/     # Botões, cards, modal, estados vazios e elementos reutilizáveis
├── hooks/          # Store e ações do aplicativo
├── layouts/        # Mockup mobile, navegação e guardas de rota
├── pages/          # Telas e fluxos da aplicação
├── services/       # Contrato de armazenamento e implementação LocalStorage
├── styles/         # Tailwind e estilos globais
├── types/          # Modelos TypeScript do domínio
├── utils/          # Prioridade, datas e alertas
└── main.tsx        # Rotas e ponto de entrada
```

## Pontos importantes para alterar

- Os pesos e faixas de prioridade ficam em `src/utils/priority.ts`.
- A geração de alertas fica em `src/utils/alerts.ts`.
- Os modelos de atividade, projeto, etapas e configurações ficam em `src/types/index.ts`.
- A persistência está concentrada em `src/services/storage.ts`; nenhum componente chama `localStorage` diretamente.
- Os fluxos de criação, edição e exclusão estão em `src/hooks/useAppStore.tsx`.
- Paleta, fontes, campos e animações ficam em `src/styles/index.css` e `tailwind.config.js`.

## Próximo passo: backend

O `StorageService` em `src/services/storage.ts` é o ponto de troca. Para usar Firebase, Supabase ou uma API própria, crie outra classe que implemente `load`, `save` e `clear`, ou amplie o contrato para operações assíncronas por entidade. Mantenha os tipos e as ações da store; assim as páginas não precisam ser reescritas. Em produção, a autenticação simulada deve ser substituída por um provedor seguro — senhas nunca devem ficar no armazenamento do navegador.

## Próximo passo: Android e iOS

A lógica de domínio, modelos e serviços são independentes da interface. Para React Native/Expo, reutilize `src/types`, `src/utils` e uma versão da store, trocando apenas `pages`, `components`, `layouts` e o adaptador de armazenamento (por exemplo, AsyncStorage/SecureStore). Também é possível manter este app web e empacotá-lo como aplicativo com Capacitor.
