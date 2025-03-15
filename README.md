<div align="center">
  <br />
  <a href=https://res.cloudinary.com/dmhyzqdp9/image/upload/v1742073923/screenshot-for-readme_ojudqh.png" target="_blank">
    <img src="https://res.cloudinary.com/dmhyzqdp9/image/upload/v1742073923/screenshot-for-readme_ojudqh.png" alt="Project Banner" />
  </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Vite-black?style=for-the-badge&logo=vite&logoColor=FFD62E&color=646CFF" alt="Vite" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB&color=20232A" alt="React" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-Stripe-black?style=for-the-badge&logo=stripe&logoColor=635BFF&color=635BFF" alt="Stripe" />
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logo=node.js&logoColor=white&color=339933" alt="Node.js" />
  </div>

  <h3 align="center">Ecommerce Story - Plataforma de E-commerce com Storytelling</h3>
</div>

---

## 🎓 O que aprendi neste projeto

### Arquitetura & Performance
- Criação de uma **plataforma de e-commerce** escalável utilizando uma abordagem modular.
- Utilização do **Vite** para desenvolvimento rápido e build otimizado.
- Implementação de **upload de arquivos** com Multer para gerenciamento de mídias dos produtos.

### Integrações & Funcionalidades
- Integração segura com **Stripe** para processamento de pagamentos.
- Gerenciamento de estado global com **Zustand** e comunicação via **Axios** com a API.
- Animações e transições suaves utilizando **Framer Motion** para melhorar a experiência do usuário.
- Criação de gráficos e dashboards com **Recharts** para análise de vendas e métricas.

### Fluxos de Trabalho e Boas Práticas
- Adoção de **componentes funcionais** e hooks do React para um código limpo e moderno.
- Configuração de **linting** e boas práticas de código com ESLint.
- Estrutura modular separando o **backend** e o **frontend** para facilitar a manutenção.

---

## 🛠️ Principais Tecnologias Dominadas

| Categoria      | Tecnologias                                                                                   |
|----------------|-----------------------------------------------------------------------------------------------|
| **Frontend**   | Vite, React 19, Tailwind CSS, Framer Motion, React Router DOM, React Hot Toast, Recharts, Axios |
| **Backend**    | Node.js, Express, Multer, Stripe, JWT (para autenticação)                                     |
| **DevOps**     | Gerenciamento via Git, scripts npm para desenvolvimento e build                               |
| **Ferramentas**| VSCode, Postman, Docker (opcional), GitHub Actions (CI/CD)                                      |

---

## ✨ Funcionalidades Implementadas

### Sistema Principal
- **Autenticação Segura:** Login e registro com validação JWT e gerenciamento de sessões.
- **Catálogo de Produtos:** Listagem dinâmica, detalhamento de produtos e imagens.
- **Carrinho de Compras:** Adição, remoção e atualização de itens no carrinho.
- **Checkout Integrado:** Processamento de pagamentos seguro via Stripe.
- **Painel Administrativo:** Gerenciamento de produtos, pedidos e controle de usuários.

### Funcionalidades Avançadas
- **Animações e Transições:** Experiência de usuário aprimorada com Framer Motion.
- **Upload de Mídia:** Suporte a upload de imagens e vídeos para produtos usando Multer.
- **Dashboard Analítico:** Visualização de métricas e gráficos com Recharts.
- **Gerenciamento de Estado:** Uso de Zustand para sincronização de dados em tempo real.

---

## 🚀 Como Executar

### Clonando o Repositório

```bash
git clone https://github.com/RafaelBispoSantos/ecommerce-story.git
cd ecommerce-story
```
### Instalação
O projeto está organizado em duas pastas: backend e frontend. Instale as dependências em cada uma delas.

Backend
Navegue até a pasta backend e instale as dependências:

```bash
cd backend
npm install
```
Frontend
Navegue até a pasta frontend e instale as dependências:
```bash
cd ../frontend
npm install
```

### Configuração de Variáveis de Ambiente
Crie um arquivo .env na raiz de cada pasta e adicione as variáveis necessárias.

Exemplo para o Backend:
```bash
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```
Exemplo para o Frontend (se necessário):
```bash
VITE_API_ENDPOINT=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```
Abra http://localhost:3000 no navegador para visualizar a aplicação.

## 📚 Recursos e Documentação

- [Documentação do Vite](https://vitejs.dev/)
- [Guia do React](https://reactjs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Express.js Guide](https://expressjs.com/)

## 📢 Contribuições

Se você deseja contribuir para o projeto:

- Abra uma [issue](https://github.com/RafaelBispoSantos/ecommerce-story/issues) para relatar problemas ou sugerir melhorias.
- Envie um pull request com suas alterações.

---

© 2025 Ecommerce Story


