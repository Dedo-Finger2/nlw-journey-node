# Plann.er - NLW Journey

**Organização de Viagens com Facilidade**

O Plann.er é uma API desenvolvido durante o evento NLW Journey, um evento 100% prático da Rocketseat. Mestrado no ano de 2024.

Com o Plann.er os usuários encontram uma maneira prática e simples de organizar e gerenciar suas viagens, facilitando o gerenciamento das viagens e livrando os usuários de estresse.

## Funcionalidades da API

- **Crie roteiros detalhados:** Organize as etapas da sua viagem, incluindo destinos, atividades, datas e horários.
- **Gerencie links importantes:** Armazene links para reservas, voos, hotéis, restaurantes e outras informações relevantes em um só lugar.
- **Compartilhe com amigos e/ou familiares:** Compartilhe seu roteiro e links com outros membros da sua viagem usando apenas o endereço de email.

## Benefícios do uso da API

- **Planeje viagens perfeitas:** Organize seus roteiros com antecedência para aproveitar ao máximo o seu tempo e evitar imprevistos.
- **Centralize informações importantes:** Tenha todas as informações da sua viagem em um só lugar, acessíveis a qualquer momento e em qualquer dispositivo.
- **Colabore com seus participantes:** Planeje e organize a viagem em conjunto com seus amigos e familiares, compartilhando responsabilidades e informações.
- **Tenha uma viagem tranquila:** Minimize o estresse e maximize a diversão com um planejamento completo e organizado.

## Tecnologias Utilizadas

- Fastify
- Zod
- PrismaORM
- Nodemailer
- ESLint
- Prettier
- Lint-Staged
- Husky
- Jest

## Requisitos para Uso

1. NodeJS instalado;
2. Algum gerenciador de pacotes instalado (npm, yarn ou pnpm);

## Como Usar

1. Clone o repositório do projeto: `git clone https://github.com/Dedo-Finger2/nlw-journey-node.git`
2. Acesse a pasta do projeto e instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm start:dev`

## Arquitetura

### Requisitos

#### RFs

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

#### RNs

- [x] Não deve ser possível criar uma viagem com dados inválidos
- [x] Não deve ser possível confirmar presença em uma viagem que não exista
- [x] Não deve ser possível criar um convite, link ou atividade para viagens que não existem
- [x] Não deve ser possível editar dados de viagens que não existem
- [x] Não deve ser possível confirmar uma viagem que não exista
- [x] Ao criar uma viagem o usuário deve poder fornecer um conjunto de emails para adicionar como participantes na criação da viagem

#### RNFs

- [x] O convite de participantes deve ser feito através de envio de e-mail
- [] A plataforma deve usar banco de dados PostgreSQL
- [] Deve haver testes end to end para todas as rotas e suas ramificações / possíveis caminhos
- [] Deve ser usado um banco de dados dedicado a testes usando SQLite
- [] Antes de executar os testes uma factory deve ser acionada para adicionar dados de teste iniciais

## Implementações futuras

- [] Front-End com Vue.JS
- [] Refatoração seguindo princípios de SOLID e Clean Arch.
- [] Deploy completo da API
- [] Deploy completo do Front-End

## Links Úteis

- **Repositório do Projeto:** [https://github.com/Dedo-Finger2/nlw-journey-node](https://github.com/Dedo-Finger2/nlw-journey-node)
- **Meu LinkedIn:** [https://www.linkedin.com/in/antonio-mauricio-4645832b3/](https://www.linkedin.com/in/antonio-mauricio-4645832b3/)
- **Meu Instagram:** [https://www.instagram.com/antonioalmeida2003/](https://www.instagram.com/antonioalmeida2003/)

- **Canal da Rocketseat no YouTube:** [https://m.youtube.com/@rocketseat](https://m.youtube.com/@rocketseat)
