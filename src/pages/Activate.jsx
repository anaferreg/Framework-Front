import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { activateSeller } from "../services/api";

export default function Activate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await activateSeller(email, code);
    setLoading(false);
    if (res.message) {
      setSuccess("Conta ativada com sucesso! Redirecionando...");
      setTimeout(() => navigate("/login"), 2000);
    } else {
      setError(res.error || "Código inválido");
    }
  };

  return (
    <div style={s.page}>
      <div style={s.left}>
        <div style={s.brand}>
          <span style={s.brandIcon}>🛒</span>
          <span style={s.brandName}>Mini Mercado</span>
        </div>
        <div style={s.hero}>
          <div style={s.iconBox}>📱</div>
          <h1 style={s.heroTitle}>Verifique seu WhatsApp</h1>
          <p style={s.heroSub}>Enviamos um código de 4 dígitos para o número cadastrado. Insira o código para ativar sua conta.</p>
          <div style={s.tip}>
            <span style={s.tipIcon}>💡</span>
            <span style={s.tipText}>Não recebeu? Aguarde alguns segundos e verifique a caixa de entrada do WhatsApp.</span>
          </div>
        </div>
      </div>

      <div style={s.right}>
        <div style={s.card}>
          <h2 style={s.title}>Ativar conta</h2>
          <p style={s.subtitle}>Insira seu email e o código recebido</p>

          {error && <div style={s.error}>{error}</div>}
          {success && <div style={s.successBox}>{success}</div>}

          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Email</label>
              <input
                style={s.input}
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>Código de ativação</label>
              <input
                style={s.codeInput}
                type="text"
                placeholder="0000"
                maxLength={4}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <button style={loading ? s.btnDisabled : s.btn} type="submit" disabled={loading}>
              {loading ? "Ativando..." : "Ativar conta"}
            </button>
          </form>

          <p style={s.footer}>
            <Link to="/login">← Voltar para o login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh" },
  left: { flex: 1, background: "linear-gradient(135deg, #000000 0%, #000201 100%)", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  brandIcon: { fontSize: "28px" },
  brandName: { fontSize: "20px", fontWeight: "600", color: "#fff" },
  hero: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "20px" },
  iconBox: { fontSize: "56px" },
  heroTitle: { fontFamily: "'DM Serif Display', serif", fontSize: "40px", color: "#fff", lineHeight: 1.2, maxWidth: "400px" },
  heroSub: { fontSize: "16px", color: "rgba(255,255,255,0.75)", maxWidth: "360px", lineHeight: 1.6 },
  tip: { display: "flex", gap: "12px", background: "rgba(255,255,255,0.1)", padding: "16px", borderRadius: "12px", maxWidth: "380px" },
  tipIcon: { fontSize: "20px", flexShrink: 0 },
  tipText: { fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 },
  right: { width: "480px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px" },
  card: { width: "100%", maxWidth: "380px" },
  title: { fontSize: "28px", fontWeight: "600", color: "#1c1917", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#78716c", marginBottom: "32px" },
  error: { background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  successBox: { background: "#f0fdf4", border: "1px solid #86efac", color: "#16a34a", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#44403c", marginBottom: "6px" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e8e5e0", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#fafaf9" },
  codeInput: { width: "100%", padding: "16px 14px", border: "1.5px solid #e8e5e0", borderRadius: "10px", fontSize: "28px", fontWeight: "600", letterSpacing: "0.5em", textAlign: "center", outline: "none", background: "#fafaf9" },
  btn: { width: "100%", padding: "13px", background: "#1e2236", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "pointer", marginTop: "8px" },
  btnDisabled: { width: "100%", padding: "13px", background: "#86efac", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "500", cursor: "not-allowed", marginTop: "8px" },
  footer: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#78716c" },
};