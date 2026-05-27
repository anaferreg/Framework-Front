const BASE_URL = "http://127.0.0.1:8080";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// AUTH
export const login = (email, password) =>
  fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());

// SELLERS
export const registerSeller = (data) =>
  fetch(`${BASE_URL}/api/sellers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const activateSeller = (email, code) =>
  fetch(`${BASE_URL}/api/sellers/activate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  }).then((res) => res.json());

// PRODUTOS
export const getProducts = () =>
  fetch(`${BASE_URL}/api/products`, { headers: headers() }).then((res) =>
    res.json()
  );

export const getProduct = (id) =>
  fetch(`${BASE_URL}/api/products/${id}`, { headers: headers() }).then((res) =>
    res.json()
  );

export const createProduct = (data) =>
  fetch(`${BASE_URL}/api/products`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const updateProduct = (id, data) =>
  fetch(`${BASE_URL}/api/products/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const inactivateProduct = (id) =>
  fetch(`${BASE_URL}/api/products/${id}/inactivate`, {
    method: "PATCH",
    headers: headers(),
  }).then((res) => res.json());

// VENDAS
export const getSales = () =>
  fetch(`${BASE_URL}/api/sales`, { headers: headers() }).then((res) =>
    res.json()
  );

export const createSale = (data) =>
  fetch(`${BASE_URL}/api/sales`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((res) => res.json());

// DASHBOARD
export const getDashboard = () =>
  fetch(`${BASE_URL}/api/dashboard`, { headers: headers() }).then((res) =>
    res.json()
  )

  