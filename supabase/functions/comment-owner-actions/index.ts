import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

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
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return jsonResponse({ error: "Missing Supabase server env" }, 500);
    }

    const { action, commentId, deviceId } = await req.json();

    if (action !== "delete" || !commentId || !deviceId) {
      return jsonResponse({ error: "Missing required fields" }, 400);
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data: existingComment, error: fetchError } = await admin
      .from("comments")
      .select("id, device_id")
      .eq("id", commentId)
      .maybeSingle();

    if (fetchError) {
      return jsonResponse({ error: fetchError.message }, 500);
    }

    if (!existingComment) {
      return jsonResponse({ error: "Comment not found" }, 404);
    }

    if (existingComment.device_id !== deviceId) {
      return jsonResponse({ error: "Not allowed to delete this comment" }, 403);
    }

    const { error: deleteError } = await admin
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (deleteError) {
      return jsonResponse({ error: deleteError.message }, 500);
    }

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});
