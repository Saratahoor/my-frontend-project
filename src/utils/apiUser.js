export async function apiFileCase(obj) {
  const { user_id, ...rest } = obj;
  const res = await fetch(
    `http://localhost:3000/api/users/bookCase/${user_id}`,
    {
      method: "POST",
      body: JSON.stringify(rest),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include", // required if auth_token is in cookies
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiTrackMyCase(ids) {
  const { user_id, case_id } = ids;
  const res = await fetch(
    `http://localhost:3000/api/users/fetchMyCases/${user_id}/${case_id}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
}
