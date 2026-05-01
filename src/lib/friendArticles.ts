import { supabase } from "./supabase";
import { FriendArticle } from "../types/friendArticle";

export async function fetchPublishedFriendArticles() {
  return supabase
    .from("friend_articles")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .returns<FriendArticle[]>();
}

export async function fetchPublishedFriendArticleBySlug(slug: string) {
  return supabase
    .from("friend_articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle<FriendArticle>();
}
