import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getSales } from "../services/api";

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
            <div style={s.brandName}>MINI Mercado</div>
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

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSales().then((res) => setSales(res.sales || []));
  }, []);

  const total = sales.reduce((acc, s) => acc + s.total, 0);

  return (
    <div style={s.page}>
      <Sidebar active="/sales" />
      <div style={s.main}>
        <div style={s.topbar}>
          <div>
            <h1 style={s.pageTitle}>Vendas</h1>
            <p style={s.pageSubtitle}>Histórico completo de vendas realizadas.</p>
          </div>
          <button style={s.btnNew} onClick={() => navigate("/sales/new")}>+ Nova venda</button>
        </div>

        <div style={s.cards}>
          <div style={s.card}>
            <div style={s.cardIcon}>🛒</div>
            <p style={s.cardLabel}>Total de vendas</p>
            <p style={s.cardValue}>{sales.length}</p>
          </div>
          <div style={{ ...s.card, ...s.cardBlue }}>
            <div style={s.cardIcon}>💰</div>
            <p style={s.cardLabelLight}>Receita total</p>
            <p style={s.cardValueLight}>R$ {total.toFixed(2)}</p>
          </div>
        </div>

        <div style={s.section}>
          <h2 style={s.sectionTitle}>Histórico de vendas</h2>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Produto</th>
                <th style={s.th}>Quantidade</th>
                <th style={s.th}>Preço unit.</th>
                <th style={s.th}>Total</th>
                <th style={s.th}>Data</th>
              </tr>
            </thead>
            <tbody>
              {sales.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#93b4d4", padding: "40px" }}>
                    Nenhuma venda registrada ainda.
                  </td>
                </tr>
              )}
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td style={s.td}><span style={s.productName}>{sale.product_name}</span></td>
                  <td style={s.td}><span style={s.qty}>{sale.quantity} un.</span></td>
                  <td style={s.td}>R$ {sale.price_at_moment.toFixed(2)}</td>
                  <td style={s.td}><span style={s.green}>R$ {sale.total.toFixed(2)}</span></td>
                  <td style={s.td}><span style={s.date}>{sale.date}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
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
  topbar: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" },
  pageTitle: { fontSize: "24px", fontWeight: "700", color: "#1e3a5f" },
  pageSubtitle: { fontSize: "13px", color: "#7aa3c8", marginTop: "4px" },
  btnNew: { background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "500", cursor: "pointer", boxShadow: "0 3px 10px rgba(37,99,235,0.3)" },
  cards: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "24px", maxWidth: "420px" },
  card: { background: "#ffffff", border: "1px solid #dce6f5", padding: "20px 24px", borderRadius: "16px", boxShadow: "0 1px 6px rgba(59,130,246,0.07)" },
  cardBlue: { background: "linear-gradient(135deg, #2563eb, #3b82f6)", border: "none", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" },
  cardIcon: { fontSize: "22px", marginBottom: "10px" },
  cardLabel: { fontSize: "12px", color: "#7aa3c8", marginBottom: "6px" },
  cardLabelLight: { fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "6px" },
  cardValue: { fontSize: "28px", fontWeight: "700", color: "#1e3a5f" },
  cardValueLight: { fontSize: "28px", fontWeight: "700", color: "#fff" },
  section: { background: "#ffffff", border: "1px solid #dce6f5", borderRadius: "16px", overflow: "hidden", boxShadow: "0 1px 6px rgba(59,130,246,0.07)" },
  sectionTitle: { fontSize: "14px", fontWeight: "600", color: "#1e3a5f", padding: "18px 24px", borderBottom: "1px solid #dce6f5" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { padding: "10px 24px", textAlign: "left", fontSize: "11px", color: "#93b4d4", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", background: "#f7faff" },
  td: { padding: "14px 24px", fontSize: "13px", color: "#3d5a7a", borderTop: "1px solid #eef3fb" },
  productName: { fontWeight: "600", color: "#1e3a5f" },
  qty: { background: "rgba(37,99,235,0.1)", color: "#2563eb", padding: "3px 8px", borderRadius: "6px", fontSize: "12px" },
  green: { color: "#059669", fontWeight: "600" },
  date: { color: "#93b4d4", fontSize: "12px" },
};