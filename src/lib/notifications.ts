type ReplyNotificationPayload = {
  postSlug: string;
  postTitle: string;
  replyAuthorName: string;
  replyContent: string;
  parentCommentId: number;
  parentAuthorName: string;
  postUrl: string;
};

type CommentNotificationPayload = {
  postSlug: string;
  postTitle: string;
  commentAuthorName: string;
  commentContent: string;
  postUrl: string;
  language: "zh" | "en";
};

type LikeNotificationPayload = {
  postSlug: string;
  postTitle: string;
  postUrl: string;
  language: "zh" | "en";
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function sendReplyNotification(payload: ReplyNotificationPayload) {
  console.log("[sendReplyNotification] env", {
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(anonKey),
  });

  if (!supabaseUrl || !anonKey) {
    return {
      data: null,
      error: new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY"),
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/smooth-processor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "playxeld@gmail.com",
        ...payload,
      }),
    });

    console.log("[sendReplyNotification] response.status", response.status);

    const data = await response.json().catch(() => null);
    console.log("[sendReplyNotification] response.data", data);

    if (!response.ok) {
      return {
        data: null,
        error: new Error(`smooth-processor returned ${response.status}`),
      };
    }

    return { data, error: null };
  } catch (error) {
    console.log("[sendReplyNotification] request.error", error);

    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown notification error"),
    };
  }
}

export async function sendCommentNotification(payload: CommentNotificationPayload) {
  console.log("[sendCommentNotification] env", {
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(anonKey),
  });

  if (!supabaseUrl || !anonKey) {
    return {
      data: null,
      error: new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY"),
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/smooth-processor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "comment",
        to: "playxeld@gmail.com",
        ...payload,
      }),
    });

    console.log("[sendCommentNotification] response.status", response.status);

    const data = await response.json().catch(() => null);
    console.log("[sendCommentNotification] response.data", data);

    if (!response.ok) {
      return {
        data: null,
        error: new Error(`smooth-processor returned ${response.status}`),
      };
    }

    return { data, error: null };
  } catch (error) {
    console.log("[sendCommentNotification] request.error", error);

    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown notification error"),
    };
  }
}

export async function sendLikeNotification(payload: LikeNotificationPayload) {
  console.log("[sendLikeNotification] env", {
    hasSupabaseUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(anonKey),
  });

  if (!supabaseUrl || !anonKey) {
    return {
      data: null,
      error: new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY"),
    };
  }

  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/smooth-processor`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "like",
        to: "playxeld@gmail.com",
        ...payload,
      }),
    });

    console.log("[sendLikeNotification] response.status", response.status);

    const data = await response.json().catch(() => null);
    console.log("[sendLikeNotification] response.data", data);

    if (!response.ok) {
      return {
        data: null,
        error: new Error(`smooth-processor returned ${response.status}`),
      };
    }

    return { data, error: null };
  } catch (error) {
    console.log("[sendLikeNotification] request.error", error);

    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown notification error"),
    };
  }
}
