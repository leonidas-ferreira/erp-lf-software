# 📱 ERP LF SOFTWARE & INFRA (Mobile App)

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

Aplicação mobile robusta desenvolvida para otimizar a produtividade e a gestão de tarefas operacionais, criada como extensão da infraestrutura da **LF SOFTWARE & INFRA**.

Desenvolvida com **React Native** e **TypeScript**, a aplicação tem como foco a usabilidade, alta performance em ambientes Android e funcionamento offline através de banco de dados local.

---

## 🚀 Principais Funcionalidades

O aplicativo foi desenhado para facilitar a rotina de manutenção e gestão de serviços de TI, contando com recursos essenciais como:

- **Gestão de Chamados:** Criação, listagem e controle de chamados técnicos (O.S.).
- **Geração de PDF:** Capacidade nativa de gerar e compartilhar Ordens de Serviço diretamente do celular em formato PDF (via `expo-file-system` e `expo-sharing`).
- **Controle de Estoque:** Módulo dedicado para controle e visualização de produtos e peças de hardware disponíveis, utilizando Redux para gerenciamento de estado.
- **Cadastro de Clientes:** Interface fluida para o registro e manutenção da carteira de clientes.
- **Armazenamento Local Segura:** Utilização de **SQLite** via `op-sqlite` para garantir acesso rápido e funcionamento independente de conexão constante à internet.

---

## 🛠️ Tecnologias e Arquitetura

O ecossistema do projeto foi construído utilizando as seguintes ferramentas:

- **Framework:** React Native (com Expo)
- **Linguagem:** TypeScript
- **Banco de Dados Local:** SQLite (op-sqlite)
- **Gerenciamento de Estado:** Redux / Redux Toolkit (`estoqueSlice`)
- **Navegação:** React Navigation
- **Arquitetura:** MVC (Model, View, Controller) com pastas organizadas (`src/controllers`, `src/models`, `src/views`, `src/screens`).

---

## 📸 Telas do Aplicativo (Em Breve)

*(Espaço reservado para as capturas de tela das funcionalidades de Lista de Chamados, Formulário de Estoque e Geração de O.S. em PDF)*

---

## ⚙️ Como executar o projeto localmente

### Pré-requisitos
- Node.js (v18+)
- Android Studio ou Emulador configurado
- Expo CLI (`npm install -g expo-cli`)

### Passos para rodar:

1. Clone este repositório
```bash
git clone [https://github.com/leonidas-ferreira/erp-lf-software.git](https://github.com/leonidas-ferreira/erp-lf-software.git)
