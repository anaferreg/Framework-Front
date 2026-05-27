import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProducts, createSale } from "../services/api";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "⊞" },
    { to: "/products", label: "Produtos", icon: "◎" },
    { to: "/sales", label: "Vendas", icon: "🛒" },
  ];
  return (
    <div style={s.sidebar}>
      <div>
        <div style={s.brand}>
          <div style={s.avatar}>S</div>
          <div>
            <div style={s.brandName}>MINI MERCADO</div>
            <div style={s.brandSub}>Gestão de vendas</div>
          </div>
        </div>
        <div style={s.navGroup}>
          <div style={s.navLabel}>Operação</div>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={active === l.to ? s.navActive : s.navLink}>
              <span style={s.navIcon}>{l.icon}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div style={s.sidebarBottom}>
        <div style={s.userRow}>
          <div style={s.userAvatar}>V</div>
          <span style={s.userName}>Vendedor</span>
          <button style={s.logoutBtn} onClick={handleLogout}>⇥</button>
        </div>
      </div>
    </div>
  );
};

export default function SaleForm() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProducts().then((res) => {
      const ativos = (res.products || []).filter((p) => p.status === "ATIVO");
      setProducts(ativos);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await createSale({ product_id: parseInt(productId), quantity: parseInt(quantity) });
    if (res.sale) {
      setSuccess("Venda registrada com sucesso!");
      setTimeout(() => navigate("/sales"), 1500);
    } else {
      setError(res.error || "Erro ao registrar venda");
    }
  };

  return (
    <div style={s.page}>
      <Sidebar active="/sales" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>Nova Venda</h1>
            <p style={s.pageSubtitle}>Registre uma nova venda no sistema.</p>
          </div>
        </div>

        {error && <div style={s.error}>{error}</div>}
        {success && <div style={s.successBox}>{success}</div>}

        <div style={s.card}>
          <form onSubmit={handleSubmit}>
            <div style={s.field}>
              <label style={s.label}>Produto</label>
              <select style={s.input} value={productId} onChange={(e) => setProductId(e.target.value)} required>
                <option value="">Selecione um produto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — R$ {p.price.toFixed(2)} (estoque: {p.quantity})
                  </option>
                ))}
              </select>
            </div>

            <div style={s.field}>
              <label style={s.label}>Quantidade</label>
              <input style={s.input} type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </div>

            <div style={s.actions}>
              <button style={s.btnCancel} type="button" onClick={() => navigate("/sales")}>Cancelar</button>
              <button style={s.btnSave} type="submit">Registrar Venda</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", minHeight: "100vh", background: "#f0f4fb" },
  sidebar: { width: "210px", background: "#ffffff", borderRight: "1px solid #dce6f5", padding: "20px 12px", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "sticky", top: 0, height: "100vh", boxShadow: "2px 0 8px rgba(59,130,246,0.06)" },
  brand: { display: "flex", alignItems: "center", gap: "10px", padding: "8px", marginBottom: "28px" },
  avatar: { width: "36px", height: "36px", background: "linear-gradient(135deg, #2563eb, #3b82f6)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "16px", boxShadow: "0 2px 8px rgba(37,99,235,0.3)" },
  brandName: { fontSize: "14px", fontWeight: "700", color: "#1e3a5f" },
  brandSub: { fontSize: "11px", color: "#93b4d4" },
  navGroup: { display: "flex", flexDirection: "column", gap: "2px" },
  navLabel: { fontSize: "11px", color: "#93b4d4", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: "8px" },
  navLink: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#5a7fa8", textDecoration: "none" },
  navActive: { display: "flex", alignItems: "center", gap: "10px", padding: "9px 10px", borderRadius: "8px", fontSize: "13px", color: "#2563eb", textDecoration: "none", background: "#eff6ff", fontWeight: "600" },
  navIcon: { fontSize: "15px", width: "18px", textAlign: "center" },
  sidebarBottom: { borderTop: "1px solid #dce6f5", paddingTop: "16px" },
  userRow: { display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px" },
  userAvatar: { width: "28px", height: "28px", background: "#2563eb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "600" },
  userName: { fontSize: "13px", color: "#5a7fa8", flex: 1 },
  logoutBtn: { background: "none", border: "none", color: "#93b4d4", cursor: "pointer", fontSize: "16px" },
  main: { flex: 1, padding: "32px 40px" },
  topbar: { marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", color: "#1e3a5f" },
  pageSubtitle: { fontSize: "13px", color: "#7aa3c8", marginTop: "4px" },
  error: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", color: "#dc2626", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  successBox: { background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", color: "#059669", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "16px" },
  card: { background: "#ffffff", border: "1px solid #dce6f5", borderRadius: "16px", padding: "32px", maxWidth: "480px", boxShadow: "0 1px 6px rgba(59,130,246,0.07)" },
  field: { marginBottom: "20px" },
  label: { display: "block", fontSize: "12px", fontWeight: "600", color: "#5a7fa8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" },
  input: { width: "100%", padding: "11px 14px", border: "1px solid #dce6f5", borderRadius: "10px", fontSize: "14px", outline: "none", background: "#f7faff", color: "#1e3a5f", boxSizing: "border-box" },
  actions: { display: "flex", gap: "12px", marginTop: "8px" },
  btnCancel: { flex: 1, padding: "11px", background: "#eef3fb", color: "#5a7fa8", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
  btnSave: { flex: 1, padding: "11px", background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 3px 10px rgba(37,99,235,0.3)" },
};