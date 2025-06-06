export async function apiLogin(creds) {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": "true",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function fetchUser() {
  const res = await fetch("http://localhost:3000/api/auth/secret", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}
