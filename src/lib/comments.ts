import { Comment, CommentInsert } from "../types/comment";
import { supabase } from "./supabase";

export async function fetchApprovedComments(postSlug: string) {
  return supabase
    .from("comments")
    .select("*")
    .eq("post_slug", postSlug)
    .order("created_at", { ascending: false })
    .returns<Comment[]>();
}

export async function createComment(comment: CommentInsert) {
  return supabase.from("comments").insert(comment);
}
