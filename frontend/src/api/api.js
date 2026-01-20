const API = "http://localhost:4000";

export const getJobs = () => fetch(`${API}/jobs`).then(r => r.json());
export const uploadResume = (data) =>
  fetch(`${API}/resume`, { method: "POST", body: data });

export const applyJob = (payload) =>
  fetch(`${API}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

export const chat = (message) =>
  fetch(`${API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  }).then(r => r.json());