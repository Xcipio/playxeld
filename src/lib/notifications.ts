import { supabase } from "./supabase";

type ReplyNotificationPayload = {
  postSlug: string;
  postTitle: string;
  replyAuthorName: string;
  replyContent: string;
  parentCommentId: number;
  parentAuthorName: string;
  postUrl: string;
};

export async function notifyReplyByEmail(payload: ReplyNotificationPayload) {
  return supabase.functions.invoke("smooth-processor", {
    body: {
      to: "playxeld@gmail.com",
      ...payload,
    },
  });
}
