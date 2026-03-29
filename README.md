# CodeLeap Front-end Junior Test

## Language Navigation

- [English](#english)
- [Português](#português)
***

### Deployed application to test: https://emanuel-codeleap-frontend.vercel.app  

***

# English

Frontend application built with React + TypeScript + Vite for username-based sign in and one-post-per-user management.

### Stack

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios
- Tailwind CSS

### How the project works

#### Routes

- "/": username entry screen.
- "/main": main feed screen for creating and listing posts.

#### Username auth flow

- On submit, the app fetches /users.
- If a matching username exists, it signs in with that existing user.
- If it does not exist, it creates a new user in /users with empty title/content.

#### Session persistence

- The logged user is stored in localStorage under local.auth.user.
- On app load, UserContext hydrates this session.
- On /main, user validity is re-checked periodically against the API.
- If the user no longer exists, the local session is cleared and the app redirects to /.

#### Post flow

- The users resource is the source of post data.
- Each user stores post fields in its own record: title, content, created_datetime.
- Create/edit uses PUT on /users/:id.
- Delete also uses PUT, clearing title and content.
- Feed listing loads all users, filters users with title and content, and sorts by created_datetime desc.

Important note:
- The original idea was PATCH, but MockAPI free plan blocks PATCH for this use case. Because of that limitation, the project uses a PUT workaround to update full user records.

#### Current business rule

- Each user can have only one active post at a time.
- If title/content are already filled for the current user, the create form is blocked.

### API and environment variable

The frontend calls only `/api` in [src/api/api-url.ts](src/api/api-url.ts).

- Local development: Vite proxy forwards `/api/*` to `MOCK_API_URL` (configured in [vite.config.ts](vite.config.ts)).
- Production (Vercel): rewrite in [vercel.ts](vercel.ts) forwards `/api/*` to `MOCK_API_URL`.
- `MOCK_API_URL` is server-side only and is not exposed in the client bundle.

### Running locally

#### 1. Install dependencies

```bash
npm install
```

#### 2. Configure environment

Create .env from .env.example and set the upstream API URL.

MockAPI example:

```env
MOCK_API_URL=https://<your-id>.mockapi.io/api
```

#### 3. Start development server

```bash
npm run dev
```

Vite runs on port 5000 (configured in [vite.config.ts](vite.config.ts)).

#### 4. Open in browser

http://localhost:5000

### Available scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Main structure

- [src/context/UserContext.tsx](src/context/UserContext.tsx): user session and local persistence.
- [src/api/create-auth-users.ts](src/api/create-auth-users.ts): username sign in/sign up flow.
- [src/api/get-users.ts](src/api/get-users.ts): user queries.
- [src/api/patch-post.ts](src/api/patch-post.ts): create/edit post with PUT.
- [src/api/delete-post.ts](src/api/delete-post.ts): clear post content with PUT.
- [src/pages/sign-up/SignUpModal.tsx](src/pages/sign-up/SignUpModal.tsx): username entry.
- [src/pages/main-screen/MainPage.tsx](src/pages/main-screen/MainPage.tsx): route guard and session validation.
- [src/pages/main-screen/CreatePosts.tsx](src/pages/main-screen/CreatePosts.tsx): post creation form.
- [src/pages/main-screen/ListPosts.tsx](src/pages/main-screen/ListPosts.tsx): feed list and edit/delete modals.

### Notes

- db.json is still in the repo as a legacy artifact from an early phase, but current dev script runs only Vite.
- For Vercel deploy, set MOCK_API_URL in Project Settings -> Environment Variables.
- Vercel routing is configured in [vercel.ts](vercel.ts) with external rewrites and SPA fallback.
- This is the users structure: 
## JSON
```
{
   users: [{
      "id": number,
      "username": string,
      "title": string,
      "content": string,
      "created_datetime": string
   }]
}
```

***

# Português 

Aplicacao frontend em React + TypeScript + Vite para cadastro/login por username e gerenciamento de um post por usuario.

### Stack

- React 19
- TypeScript
- Vite
- React Router
- React Hook Form
- Axios
- Tailwind CSS

### Como o projeto funciona

#### Rotas

- "/": tela de entrada com username.
- "/main": tela principal com criacao e listagem de posts.

#### Autenticacao por username

- Ao enviar username, o app busca em /users.
- Se encontrar usuario com o mesmo username, faz login com esse registro.
- Se nao encontrar, cria um novo usuario em /users com title/content vazios.

#### Persistencia de sessão

- O usuario logado fica salvo no localStorage com a chave local.auth.user.
- No carregamento do app, o UserContext reidrata essa sessao.
- Na rota /main, existe validacao periodica do usuario na API.
- Se o usuario nao existir mais na API, a sessao local e limpa e o app redireciona para /.

#### Fluxo de posts

- O projeto usa o recurso users como fonte de dados.
- Cada usuario possui campos de post no proprio registro: title, content e created_datetime.
- Criar e editar post usam PUT em /users/:id (inicialmente usava PATCH, porem o MockAPI limita PATCH no plano gratuito e isso exigiu uma gambiarra de contorno com PUT).
- Excluir post tambem usa PUT, limpando title e content.
- A listagem carrega todos os users, filtra quem tem title e content, e ordena por created_datetime desc.

#### Regra de negocio atual

- Cada usuario pode ter apenas um post ativo por vez.
- Se o usuario ja tiver title e content preenchidos, o formulario de criacao fica bloqueado.

### API e variavel de ambiente

O frontend chama apenas `/api` em [src/api/api-url.ts](src/api/api-url.ts).

- Desenvolvimento local: o proxy do Vite redireciona `/api/*` para `MOCK_API_URL` (configurado em [vite.config.ts](vite.config.ts)).
- Producao (Vercel): o rewrite em [vercel.ts](vercel.ts) redireciona `/api/*` para `MOCK_API_URL`.
- `MOCK_API_URL` fica somente no servidor e nao aparece no bundle do frontend.

### Como rodar localmente

#### 1. Instalar dependencias

```bash
npm install
```

#### 2. Configurar ambiente

Crie o arquivo .env a partir do .env.example e defina a URL upstream da API.

Exemplo com MockAPI:

```env
MOCK_API_URL=https://<seu-id>.mockapi.io/api
```

#### 3. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O Vite sobe na porta 5000 (configurada em [vite.config.ts](vite.config.ts)).

#### 4. Abrir no navegador

http://localhost:5000

### Scripts disponiveis

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Estrutura principal

- [src/context/UserContext.tsx](src/context/UserContext.tsx): sessao do usuario e persistencia local.
- [src/api/create-auth-users.ts](src/api/create-auth-users.ts): login/cadastro por username.
- [src/api/get-users.ts](src/api/get-users.ts): consultas de usuarios.
- [src/api/patch-post.ts](src/api/patch-post.ts): criar/editar post com PUT.
- [src/api/delete-post.ts](src/api/delete-post.ts): remover conteudo do post com PUT.
- [src/pages/sign-up/SignUpModal.tsx](src/pages/sign-up/SignUpModal.tsx): entrada de username.
- [src/pages/main-screen/MainPage.tsx](src/pages/main-screen/MainPage.tsx): guarda de rota e validacao de sessao.
- [src/pages/main-screen/CreatePosts.tsx](src/pages/main-screen/CreatePosts.tsx): formulario de criacao.
- [src/pages/main-screen/ListPosts.tsx](src/pages/main-screen/ListPosts.tsx): listagem e modais de edicao/exclusao.

### Observacoes

- O arquivo db.json permanece no repositorio como legado de fase inicial, mas o script atual de desenvolvimento roda apenas Vite.
- Para deploy no Vercel, configure MOCK_API_URL em Project Settings -> Environment Variables.
- O roteamento do Vercel esta em [vercel.ts](vercel.ts), com rewrite externo da API e fallback SPA.
- Essa é a estrutura do users: 
## JSON
```
{
   users: [{
      "id": number,
      "username": string,
      "title": string,
      "content": string,
      "created_datetime": string
   }]
}
```
