# Plann.er - NLW Journey

**Organização de Viagens com Facilidade**

O Plann.er é uma API desenvolvida durante o evento NLW Journey, um evento 100% prático da Rocketseat em 2024.

Com o Plann.er, os usuários encontram uma maneira prática e simples de organizar e gerenciar suas viagens, sejam elas solo ou em grupo! Tornando o gerenciamento das viagens fácil e livrando os usuários de estresse.

---

## 📋 Funcionalidades da API

- **Crie roteiros detalhados:** Organize as etapas da sua viagem, incluindo destinos, atividades, datas e horários.
- **Gerencie links importantes:** Armazene links para reservas, voos, hotéis, restaurantes e outras informações relevantes em um só lugar.
- **Compartilhe com amigos e/ou familiares:** Compartilhe seu roteiro e links com outros membros da sua viagem usando apenas o endereço de email.

---

## 🌟 Benefícios do Uso da API

- **Planeje viagens perfeitas:** Organize seus roteiros com antecedência para aproveitar ao máximo o seu tempo e evitar imprevistos.
- **Centralize informações importantes:** Tenha todas as informações da sua viagem em um só lugar, acessíveis a qualquer momento e em qualquer dispositivo.
- **Colabore com seus participantes:** Planeje e organize a viagem em conjunto com seus amigos e familiares, compartilhando responsabilidades e informações.
- **Tenha uma viagem tranquila:** Minimize o estresse e maximize a diversão com um planejamento completo e organizado.

---

## 🛠️ Tecnologias Utilizadas

| Biblioteca        | Motivação do Uso                                                                 |
|-------------------|----------------------------------------------------------------------------------|
| Fastify           | Criação do servidor web.                                                         |
| Zod               | Validação de dados para TypeScript.                                              |
| PrismaORM         | ORM para trabalhar com bancos de dados em ambientes TypeScript de forma nativa.  |
| Nodemailer        | Envio de emails.                                                                 |
| ESLint            | Formatação e padronização do código.                                             |
| Prettier          | Embelezamento e padronização do código.                                          |
| Lint-Staged       | Aplicação de scripts específicos em apenas arquivos "staged".                    |
| Husky             | Automação de tarefas e execução de scripts em situações específicas (antes de um commit, por exemplo). |
| Jest & Supertest  | Testes end-to-end.                                                               |

---

## 🚀 Requisitos para Uso

1. NodeJS instalado;
2. Gerenciador de pacotes instalado (npm, yarn ou pnpm);

---

## 📦 Como Usar

> Clone o repositório do projeto
```bash
git clone https://github.com/Dedo-Finger2/nlw-journey-node.git
```

> Acesse a pasta do projeto e instale as dependências
```bash
cd nlw-journey-node/
yarn install
```

> Inicie o servidor de desenvolvimento
```bash
yarn start:dev
```

---

## 🏗️ Arquitetura

### Requisitos Funcionais (RFs)

- [x] O usuário deve poder criar uma nova viagem
- [x] O usuário deve poder criar uma atividade para uma viagem
- [x] O usuário deve poder criar links para as viagens
- [x] O usuário deve poder atualizar dados de uma viagem
- [x] O usuário deve poder criar um link de convite mesmo depois de ter criado a viagem
- [x] O participante deve poder confirmar sua presença em uma viagem
- [x] O usuário deve poder visualizar detalhes de uma viagem
- [x] O usuário deve poder visualizar uma lista dos participantes de uma viagem
- [x] O usuário deve poder visualizar as atividades marcadas para uma viagem
- [x] O usuário deve poder visualizar os links de uma viagem
- [x] O usuário deve poder visualizar detalhes de um participante específico
- [x] O usuário deve poder confirmar sua viagem

### Regras de Negócio (RNs)

- [x] Não deve ser possível criar uma viagem com dados inválidos
- [x] Não deve ser possível confirmar presença em uma viagem que não exista
- [x] Não deve ser possível criar um convite, link ou atividade para viagens que não existem
- [x] Não deve ser possível editar dados de viagens que não existem
- [x] Não deve ser possível confirmar uma viagem que não exista
- [x] Ao criar uma viagem o usuário deve poder fornecer um conjunto de emails para adicionar como participantes na criação da viagem

### Requisitos Não Funcionais (RNFs)

- [x] O convite de participantes deve ser feito através de envio de e-mail
- [ ] A plataforma deve usar banco de dados PostgreSQL
- [ ] Deve haver testes end to end para todas as rotas e suas ramificações / possíveis caminhos
- [ ] Deve ser usado um banco de dados dedicado a testes usando SQLite
- [ ] Antes de executar os testes uma factory deve ser acionada para adicionar dados de teste iniciais

---

## 🔮 Implementações Futuras

- [ ] Front-End com Vue.JS
- [ ] Sistema de autenticação baseado em JWT
- [ ] Refatoração seguindo princípios de SOLID e Clean Arch
- [ ] Deploy completo da API
- [ ] Deploy completo do Front-End

---

## 🔗 Links Úteis

- **Repositório do Projeto:** [https://github.com/Dedo-Finger2/nlw-journey-node](https://github.com/Dedo-Finger2/nlw-journey-node)
- **Meu LinkedIn:** [https://www.linkedin.com/in/antonio-mauricio-4645832b3/](https://www.linkedin.com/in/antonio-mauricio-4645832b3/)
- **Meu Instagram:** [https://www.instagram.com/antonioalmeida2003/](https://www.instagram.com/antonioalmeida2003/)
- **Canal da Rocketseat no YouTube:** [https://m.youtube.com/@rocketseat](https://m.youtube.com/@rocketseat)
