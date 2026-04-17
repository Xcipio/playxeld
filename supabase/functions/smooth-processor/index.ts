import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

type BasePayload = {
  to: string;
  type?: "reply" | "like" | "comment";
};

type ReplyPayload = BasePayload & {
  type?: "reply";
  postTitle: string;
  postSlug: string;
  replyAuthorName: string;
  replyContent: string;
  postUrl?: string;
};

type LikePayload = BasePayload & {
  type: "like";
  postTitle: string;
  postSlug: string;
  postUrl: string;
  language?: "zh" | "en";
};

type CommentPayload = BasePayload & {
  type: "comment";
  postTitle: string;
  postSlug: string;
  commentAuthorName: string;
  commentContent: string;
  postUrl: string;
  language?: "zh" | "en";
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return jsonResponse({ error: "Missing RESEND_API_KEY" }, 500);
    }

    const payload = (await req.json()) as ReplyPayload | LikePayload | CommentPayload;

    if (!payload?.to || !payload?.postTitle || !payload?.postSlug) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    let subject = "";
    let text = "";

    if (payload.type === "like") {
      if (!payload.postUrl) {
        return jsonResponse({ error: "Missing postUrl for like notification" }, 400);
      }

      subject = payload.language === "en"
        ? "[Playxeld] Someone liked your article"
        : "[Playxeld] 有人喜欢了你的文章";

      text = [
        `文章：${payload.postTitle}`,
        "",
        "有人点击了喜欢。",
        "",
        "查看页面：",
        payload.postUrl,
      ].join("\n");
    } else if (payload.type === "comment") {
      if (!payload.postUrl || !payload.commentAuthorName || !payload.commentContent) {
        return jsonResponse({ error: "Missing comment notification fields" }, 400);
      }

      subject = payload.language === "en"
        ? "[Playxeld] Someone commented on your article"
        : "[Playxeld] 有人评论了你的文章";

      text = [
        `文章：${payload.postTitle}`,
        `作者：${payload.commentAuthorName}`,
        "",
        "评论内容：",
        payload.commentContent,
        "",
        "查看页面：",
        payload.postUrl,
      ].join("\n");
    } else {
      if (!payload.replyAuthorName || !payload.replyContent) {
        return jsonResponse({ error: "Missing required reply fields" }, 400);
      }

      const postUrl = payload.postUrl ?? `https://playxeld.com/post/${payload.postSlug}`;

      subject = "[Playxeld] 有人回复了你的评论";
      text = [
        `文章：${payload.postTitle}`,
        `作者：${payload.replyAuthorName}`,
        "",
        "回复内容：",
        payload.replyContent,
        "",
        "查看页面：",
        postUrl,
      ].join("\n");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Playxeld <noreply@playxeld.com>",
        to: [payload.to],
        subject,
        text,
      }),
    });

    const resendData = await resendResponse.json().catch(() => null);

    if (!resendResponse.ok) {
      return jsonResponse({
        error: "Failed to send email",
        details: resendData,
      }, 500);
    }

    return jsonResponse({
      success: true,
      resend: resendData,
    });
  } catch (error) {
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});
