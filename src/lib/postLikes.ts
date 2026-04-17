import { PostLike } from "../types/post-like";
import { getClientDeviceId } from "./clientIdentity";
import { supabase } from "./supabase";

export async function fetchPostLikeState(postSlug: string) {
  const deviceId = getClientDeviceId();

  return supabase
    .from("post_likes")
    .select("*")
    .eq("post_slug", postSlug)
    .eq("device_id", deviceId)
    .maybeSingle<PostLike>();
}

export async function fetchPostLikeCount(postSlug: string) {
  return supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_slug", postSlug)
    .eq("is_active", true);
}

export async function activatePostLike(postSlug: string) {
  const deviceId = getClientDeviceId();
  const timestamp = new Date().toISOString();

  return supabase
    .from("post_likes")
    .upsert({
      post_slug: postSlug,
      device_id: deviceId,
      is_active: true,
      last_liked_at: timestamp,
      updated_at: timestamp,
    }, {
      onConflict: "post_slug,device_id",
    })
    .select()
    .single<PostLike>();
}

export async function deactivatePostLike(postSlug: string) {
  const deviceId = getClientDeviceId();
  const timestamp = new Date().toISOString();

  return supabase
    .from("post_likes")
    .update({
      is_active: false,
      updated_at: timestamp,
    })
    .eq("post_slug", postSlug)
    .eq("device_id", deviceId);
}
