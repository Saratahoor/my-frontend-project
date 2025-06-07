export async function apiGetUnverifiedUsers() {
  const res = await fetch("http://localhost:3000/api/admin/unverifiedUsers", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function apiVerifyUser(user) {
  const { user_id, status } = user;
  const res = await fetch(
    `http://localhost:3000/api/admin/verifyUser/${user_id}/${status}`,
    {
      method: "POST",
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

export async function apiGetUnverifiedMediators() {
  const res = await fetch(
    "http://localhost:3000/api/admin/unverifiedMediators",
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
}

export async function apiVerifyMediator(user) {
  const { mediator_id, status } = user;
  const res = await fetch(
    `http://localhost:3000/api/admin/verifyMediator/${mediator_id}/${status}`,
    {
      method: "POST",
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

export async function apiGetMediators() {
  const res = await fetch("http://localhost:3000/api/admin/getMediators", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}
