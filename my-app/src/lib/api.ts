const BASE_URL = "https://internshala-45cy.onrender.com/api/transactions";

export const fetchTransactions = () => fetch(BASE_URL).then(res => res.json());

export const addTransaction = (data: any) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());

export const deleteTransaction = (id: string) =>
  fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

export const updateTransaction = (id: string, data: any) =>
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
