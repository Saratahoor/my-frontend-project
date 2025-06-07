export async function apiFetchBookings() {
  const res = await fetch("http://localhost:3000/api/admin/checkBookings", {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function apiDismissBooking({ admin_id, booking_id }) {
  const res = await fetch(
    `http://localhost:3000/api/admin/dismissBooking/${admin_id}/${booking_id}`,
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

  if (data.error) {
    throw new Error(data.message);
  }

  return data;
}

export async function apiAcceptCase(booking) {
  const { admin_id, booking_id, ...rest } = booking;
  const res = await fetch(
    `http://localhost:3000/api/admin/fileCase/${admin_id}/${booking_id}`,
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

  if (data.error) {
    throw new Error(data.message);
  }

  return data;
}
