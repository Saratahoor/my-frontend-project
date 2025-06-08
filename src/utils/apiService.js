export async function apiInitializeMeetingScheduler() {
  const res = await fetch(
    "http://localhost:3000/api/service/initialize-meeting-scheduler",
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}
