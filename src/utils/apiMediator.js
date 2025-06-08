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

export async function apiAcceptCase({ mediatorId, caseId }) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/acceptCase/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function apiRejectCase({ mediatorId, caseId }) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/rejectCase/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function apiCreateMeeting({ mediatorId, caseId, scheduled_date }) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/createMeeting/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduled_date }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function apiScheduleNewDate({
  mediatorId,
  caseId,
  scheduled_date,
}) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/scheduleNewDate/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ scheduled_date }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function apiScheduleVenue({
  mediatorId,
  caseId,
  meeting_address,
}) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/scheduleVenue/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ meeting_address }),
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}

export async function apiCloseCase({ mediatorId, caseId }) {
  const res = await fetch(
    `http://localhost:3000/api/mediators/closeCase/${mediatorId}/${caseId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}
