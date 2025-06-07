export async function apiFetchMyCases(mediator_id) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/fetchMyCase/${mediator_id}`,
    {
      credentials: "include",
    }
  );
  const data = await res.json();
  return data;
}
