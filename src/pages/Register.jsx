import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerSeller } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", cnpj: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await registerSeller(form);
    setLoading(false);
    if (res.usuario) {
      setSuccess("Cadastro realizado! Verifique seu WhatsApp.");
      setTimeout(() => navigate("/activate"), 2000);
    } else {
      setError(res.error || res.erro || "Erro ao cadastrar");
    }
  };

  return (
    <div style={s.page}>

      {/* Coluna esquerda — decorativa */}
      <div style={s.decorPanel}>
        <div style={s.decorInner}>
          <div style={s.decorLogo}>
            <span style={s.decorLogoLetter}>S</span>
          </div>
          <h1 style={s.decorTitle}>MINI MERCADO</h1>
          <p style={s.decorSub}>Gestão de vendas inteligente</p>

          <div style={s.decorCards}>
            <div style={s.decorCard}>
              <span style={s.decorCardIcon}>📦</span>
              <div>
                <div style={s.decorCardLabel}>Estoque em tempo real</div>
                <div style={s.decorCardSub}>Controle total dos seus produtos</div>
              </div>
            </div>
            <div style={s.decorCard}>
              <span style={s.decorCardIcon}>📈</span>
              <div>
                <div style={s.decorCardLabel}>Métricas de vendas</div>
                <div style={s.decorCardSub}>Dashboard com insights automáticos</div>
              </div>
            </div>
            <div style={s.decorCard}>
              <span style={s.decorCardIcon}>🛒</span>
              <div>
                <div style={s.decorCardLabel}>Registro de pedidos</div>
                <div style={s.decorCardSub}>Registre vendas em segundos</div>
              </div>
            </div>
            <div style={s.decorCard}>
              <span style={s.decorCardIcon}>💬</span>
              <div>
                <div style={s.decorCardLabel}>Ativação via WhatsApp</div>
                <div style={s.decorCardSub}>Confirmação rápida e segura</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coluna direita — formulário */}
      <div style={s.formPanel}>
        <div style={s.formBox}>
          <div style={s.formHeader}>
            <div style={s.formTag}>Cadastro</div>
            <h2 style={s.formTitle}>Criar conta grátis</h2>
            <p style={s.formSub}>Preencha seus dados para começar</p>
          </div>

          {error && <div style={s.error}>{error}</div>}
          {success && <div style={s.successBox}>{success}</div>}

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Nome completo</label>
                <input
                  style={s.input}
                  name="name"
                  type="text"
                  placeholder="João Silva"
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>CNPJ</label>
                <input
                  style={s.input}
                  name="cnpj"
                  type="text"
                  placeholder="00.000.000/0001-00"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label}>E-mail</label>
              <input
                style={s.input}
                name="email"
                type="email"
                placeholder="seu@email.com"
                onChange={handleChange}
                required
              />
            </div>

            <div style={s.row}>
              <div style={s.field}>
                <label style={s.label}>Celular</label>
                <input
                  style={s.input}
                  name="phone"
                  type="text"
                  placeholder="(11) 99999-9999"
                  onChange={handleChange}
                  required
                />
              </div>
              <div style={s.field}>
                <label style={s.label}>Senha</label>
                <input
                  style={s.input}
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              style={loading ? s.btnDisabled : s.btn}
              type="submit"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Criar conta →"}
            </button>
          </form>

          <div style={s.divider}>
            <span style={s.dividerLine} />
            <span style={s.dividerText}>ou</span>
            <span style={s.dividerLine} />
          </div>

          <p style={s.footer}>
            Já tem conta?{" "}
            <Link to="/login" style={s.link}>Entrar na conta</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f0f4fb",
  },

  /* Painel esquerdo decorativo */
  decorPanel: {
    width: "420px",
    background: "#1e3a5f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 40px",
    position: "relative",
    overflow: "hidden",
  },
  decorInner: {
    position: "relative",
    zIndex: 1,
    width: "100%",
  },
  decorLogo: {
    width: "52px",
    height: "52px",
    background: "#2563eb",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  decorLogoLetter: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700",
  },
  decorTitle: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  decorSub: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.55)",
    marginBottom: "48px",
  },
  decorCards: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  decorCard: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  decorCardIcon: {
    fontSize: "22px",
    flexShrink: 0,
  },
  decorCardLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "2px",
  },
  decorCardSub: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.45)",
  },

  /* Painel direito — formulário */
  formPanel: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 32px",
  },
  formBox: {
    width: "100%",
    maxWidth: "440px",
  },
  formHeader: {
    marginBottom: "32px",
  },
  formTag: {
    display: "inline-block",
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 10px",
    borderRadius: "20px",
    marginBottom: "14px",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1e3a5f",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  formSub: {
    fontSize: "14px",
    color: "#7aa3c8",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4a6fa5",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1.5px solid #d1e3f5",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    background: "#fff",
    color: "#1e3a5f",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    letterSpacing: "0.01em",
  },
  btnDisabled: {
    width: "100%",
    padding: "14px",
    background: "#bdd5f0",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "not-allowed",
    marginTop: "4px",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "20px",
  },
  successBox: {
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    color: "#15803d",
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "20px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#dce6f5",
    display: "block",
  },
  dividerText: {
    fontSize: "12px",
    color: "#93b4d4",
  },
  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#7aa3c8",
    margin: 0,
  },
  link: {
    color: "#2563eb",
    fontWeight: "600",
    textDecoration: "none",
  },
};