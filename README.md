# 🏖️ Sistema de Gestão de Férias - CLT Brasil

Aplicação web para gerenciar solicitações e aprovação de férias de colaboradores em conformidade com a legislação trabalhista brasileira (CLT).

## 🎯 Funcionalidades Principais

- ✅ Cadastro de colaboradores com dados trabalhistas
- ✅ Solicitação de férias com validações automáticas (CLT)
- ✅ Fracionamento de férias (até 3 períodos)
- ✅ Aprovação/Recusa por gestor
- ✅ Calendário do time com visualização de férias
- ✅ Dashboard com resumo de férias
- ✅ Simulação de feriados nacionais e municipais
- ✅ Logs de alterações (auditoria)

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilização)
- **React Query** (estado remoto)
- **React Hook Form** (formulários)
- **Zod** (validação)
- **date-fns** (manipulação de datas)
- **Recharts** (gráficos)

### Backend
- **Node.js** + **Express**
- **TypeScript**
- **SQLite** (banco de dados)
- **Prisma** (ORM)
- **Zod** (validação)
- **JWT** (autenticação)
- **bcryptjs** (hashing de senhas)

## 📋 Regras de Negócio (CLT)

### 3.1 Comunicação Antecipada
- Solicitação com **mínimo 30 dias** de antecedência

### 3.2 Períodos Aquisitivo e Concessivo
- Solicitar após **"Fim Aquisitivo"**
- Respeitar **"Data Limite de Gozo"** (período concessivo)

### 3.3 Início das Férias
- Bloqueado **2 dias antes de domingos**
- Bloqueado **2 dias antes de feriados**

### 3.4 Fracionamento
- Até **3 períodos**
- 1º período: **mínimo 14 dias**
- Demais: **mínimo 5 dias cada**
- Requer **confirmação do colaborador**

### 3.5 Saldo de Férias
- Não permite solicitar **acima do saldo disponível**

### 3.6 Limite Organizacional
- Configurável **por time**
- Alerta de sobreposição

### 3.7 Governança
- Aprovação final do **gestor**
- Mensagem: *"Período definido conforme necessidade da empresa"*

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

```bash
# 1. Clonar repositório
git clone https://github.com/dianadeps/ferias.git
cd ferias

# 2. Instalar dependências
npm install

# 3. Setup do banco de dados
npm run db:setup

# 4. Executar migrations
npm run db:migrate

# 5. Seed inicial (feriados 2026, dados teste)
npm run db:seed
```

### Desenvolvimento

```bash
# Terminal 1: Backend (porta 3001)
cd backend
npm install
npm run dev

# Terminal 2: Frontend (porta 5173)
cd frontend
npm install
npm run dev
```

Backend estará em: `http://localhost:3001`
Frontend estará em: `http://localhost:5173`

### Build para Produção

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

## 📁 Estrutura do Projeto

```
ferias/
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   ├── authService.ts          # Autenticação JWT + bcrypt
│   │   │   ├── employeeService.ts      # CRUD colaboradores
│   │   │   └── vacationService.ts      # Gestão de férias
│   │   ├── middleware/
│   │   │   └── auth.ts                 # Auth + error handling
│   │   ├── schemas/
│   │   │   └── validation.ts           # Validações Zod
│   │   ├── utils/
│   │   │   └── vacationValidator.ts    # CLT validator (7 regras)
│   │   └── main.ts                     # Entrada da aplicação
│   ├── prisma/
│   │   ├── schema.prisma               # Schema do banco
│   │   └── seed.ts                     # Dados iniciais
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VacationForm.tsx        # Formulário de solicitação
│   │   │   ├── VacationList.tsx        # Lista de solicitações
│   │   │   ├── ApprovalPanel.tsx       # Painel de aprovação
│   │   │   └── TeamCalendar.tsx        # Calendário do time
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── VacationRequests.tsx
│   │   │   ├── Approvals.tsx
│   │   │   └── TeamCalendar.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts              # Hook de autenticação
│   │   │   ├── useVacation.ts          # Hook de férias
│   │   │   └── useEmployee.ts          # Hook de colaboradores
│   │   ├── services/
│   │   │   └── api.ts                  # Cliente HTTP
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔐 Segurança

- 🔒 JWT para autenticação (expiração 7 dias)
- 🔐 Hashing de senha com bcryptjs
- ✅ Validação em frontend e backend
- 🛡️ CORS configurado
- 📝 Logs de auditoria para todas as ações
- 👮 Role-based access control (ADMIN, MANAGER, EMPLOYEE)

## 👥 Tipos de Usuários

### ADMIN
- Gerenciar colaboradores
- Gerenciar times e limites de férias
- Gerenciar feriados
- Visualizar logs de auditoria

### MANAGER (Gestor)
- Aprovar/Rejeitar solicitações de férias
- Visualizar calendário do time
- Visualizar saldo de férias dos colaboradores
- Dashboard do time

### EMPLOYEE (Colaborador)
- Solicitar férias
- Visualizar solicitações próprias
- Visualizar calendário do time
- Confirmar fracionamento de férias

## 📝 Variáveis de Ambiente

### Backend (.env)
```
NODE_ENV=development
PORT=3001
DATABASE_URL=file:./dev.db
JWT_SECRET=your_jwt_secret_here_change_in_production
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=Sistema de Férias
```

## 📊 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Dados do usuário autenticado

### Colaboradores
- `GET /api/employees` - Listar colaboradores
- `GET /api/employees/:id` - Detalhes do colaborador
- `POST /api/employees` - Criar colaborador (ADMIN)
- `PUT /api/employees/:id` - Atualizar colaborador (ADMIN)
- `GET /api/employees/:id/summary` - Resumo de férias

### Solicitações de Férias
- `GET /api/vacation-requests` - Listar solicitações
- `GET /api/vacation-requests/:id` - Detalhes da solicitação
- `POST /api/vacation-requests` - Criar solicitação
- `PUT /api/vacation-requests/:id/approve` - Aprovar (MANAGER)
- `PUT /api/vacation-requests/:id/reject` - Rejeitar (MANAGER)

### Dashboard
- `GET /api/dashboard` - Métricas gerais
- `GET /api/calendar/team/:team` - Calendário do time

## 🧪 Testes

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 🐛 Troubleshooting

### Erro de banco de dados
```bash
# Resetar banco e recarregar seed
npm run db:reset
npm run db:seed
```

### Porta já em uso
Alterar em `.env`:
```
PORT=3002  # ou outra porta disponível
```

### Token expirado
Fazer login novamente para obter novo token.

## 📚 Referências CLT

- [Consolidação das Leis do Trabalho](http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
- Artigos 129-143 (Férias)
- Artigo 134 (Remuneração das férias)
- Artigo 139 (Período de concessão)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT - veja LICENSE.md para detalhes

## 📞 Suporte

Para dúvidas ou problemas:
1. Abra uma [Issue](https://github.com/dianadeps/ferias/issues)
2. Consulte a [documentação da CLT](http://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm)
3. Verifique a seção Troubleshooting acima

---

**Desenvolvido com ❤️ para gestão eficiente e conformidade com legislação trabalhista brasileira**

Última atualização: 2026-04-24
