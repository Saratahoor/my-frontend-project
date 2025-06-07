export async function apiFetchCommunityForumns() {
  const res = await fetch("http://localhost:3000/api/forum");

  const data = await res.json();
  return data.data;
}

export async function apiAddCommunityForum(forum) {
  const { user_id, ...rest } = forum;
  const res = await fetch(`http://localhost:3000/api/forum/${user_id}`, {
    method: "POST",
    body: JSON.stringify(rest),
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

export async function apiDeleteCommunityForum(ids) {
  const res = await fetch(
    `http://localhost:3000/api/forum/${ids.forum_id}/${ids.user_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  console.log(data);

  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiAddCommunityPost(post) {
  const { user_id, forumId, content } = post;
  const res = await fetch(
    `http://localhost:3000/api/forum/post/${forumId}/${user_id}`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiDeleteCommunityPost(ids) {
  const res = await fetch(
    `http://localhost:3000/api/forum/post/${ids.post_id}/${ids.user_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiAddComment(comment) {
  const { user_id, post_id, content } = comment;
  const res = await fetch(
    `http://localhost:3000/api/forum/comment/${post_id}/${user_id}`,
    {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );

  const data = await res.json();
  if (data.error) throw new Error(data.message);
  return data;
}

export async function apiDeleteComment(ids) {
  const res = await fetch(
    `http://localhost:3000/api/forum/comment/${ids.comment_id}/${ids.user_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
    }
  );

  const data = await res.json();

  if (data.error) throw new Error(data.message);
  return data;
}
