# 🛒 Mini Mercado — Sistema de Gestão de Mini Mercado

Sistema completo para sellers gerenciarem produtos, estoque, vendas e relatórios com autenticação segura e dashboard analítico.

---

## 🧱 Tecnologias

**Backend**
- Python + Flask (API REST)
- SQLAlchemy (ORM)
- JWT Authentication
- Twilio (WhatsApp)
- SQLite

**Frontend**
- React.js + Vite
- React Router DOM
- Fetch API

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Conta no [Twilio](https://www.twilio.com)

---



** Inicie o servidor**
```bash
python run.py
```

API disponível em: `http://127.0.0.1:5000`

---

### 🎨 Frontend

**1. Entre na pasta do frontend**
```bash
cd Projeto-Mini-Mercado-FrontEnd
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor**
```bash
npm run dev
```

Frontend disponível em: `http://localhost:5173`

---



---

## 🔄 Fluxo do Sistema

1. Seller se cadastra
2. Recebe código via WhatsApp
3. Ativa a conta com o código
4. Faz login e recebe token JWT
5. Cadastra produtos com imagem
6. Registra vendas
7. Visualiza dashboard com métricas

---



---

## 👨‍💻 Desenvolvido por
