"use client";

import { createClient } from "./client";

export type ProgressPayload = {
  unitSlug: string;
  step: "problem" | "explore" | "decide" | "reflect" | "completed";
  selectedOptionId?: string;
  isCorrect?: boolean;
};

export async function saveProgress(payload: ProgressPayload) {
  const supabase = createClient();
  if (!supabase) {
    return { ok: false as const, reason: "supabase-unconfigured" as const };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, reason: "unauthenticated" as const };
  }

  const { error } = await supabase.from("learn_progress").upsert(
    {
      user_id: user.id,
      unit_slug: payload.unitSlug,
      step: payload.step,
      selected_option_id: payload.selectedOptionId ?? null,
      is_correct: payload.isCorrect ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,unit_slug" },
  );

  if (error) {
    return { ok: false as const, reason: "error" as const, message: error.message };
  }

  if (payload.selectedOptionId) {
    await supabase.from("learn_submissions").insert({
      user_id: user.id,
      unit_slug: payload.unitSlug,
      selected_option_id: payload.selectedOptionId,
      is_correct: payload.isCorrect ?? null,
    });
  }

  return { ok: true as const };
}
