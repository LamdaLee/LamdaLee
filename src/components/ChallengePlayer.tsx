"use client";

import Link from "next/link";
import { useState } from "react";
import type { ChallengeUnit } from "@/lib/learn/types";
import { saveProgress } from "@/lib/supabase/progress";
import { MarkdownLite } from "./MarkdownLite";
import styles from "./ChallengePlayer.module.css";

const STEPS = [
  { id: "problem", label: "Problem" },
  { id: "explore", label: "Explore" },
  { id: "decide", label: "Decide" },
  { id: "reflect", label: "Reflect" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

type Props = {
  unit: ChallengeUnit;
};

export function ChallengePlayer({ unit }: Props) {
  const [step, setStep] = useState<StepId>("problem");
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [persistNote, setPersistNote] = useState<string | null>(null);

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const selectedOption = unit.options.find((o) => o.id === selected);

  async function persist(partial: {
    step: StepId | "completed";
    selectedOptionId?: string;
    isCorrect?: boolean;
  }) {
    const result = await saveProgress({
      unitSlug: unit.slug,
      step: partial.step,
      selectedOptionId: partial.selectedOptionId,
      isCorrect: partial.isCorrect,
    });
    if (!result.ok) {
      if (result.reason === "supabase-unconfigured") {
        setPersistNote("진행은 이 브라우저 세션에만 유지됩니다. Supabase 환경 변수를 설정하면 계정에 저장됩니다.");
      } else if (result.reason === "unauthenticated") {
        setPersistNote("로그인하면 기기 간 진행이 저장됩니다. (매직 링크)");
      } else {
        setPersistNote("진행 저장에 실패했습니다. 학습은 계속할 수 있습니다.");
      }
    } else {
      setPersistNote("진행이 저장되었습니다.");
    }
  }

  function go(next: StepId) {
    setStep(next);
    void persist({ step: next });
  }

  function onSelect(optionId: string) {
    if (answered) return;
    const option = unit.options.find((o) => o.id === optionId);
    if (!option) return;
    setSelected(optionId);
    setAnswered(true);
    void persist({
      step: "decide",
      selectedOptionId: optionId,
      isCorrect: option.correct,
    });
  }

  return (
    <article className={styles.wrap}>
      <div className={styles.meta}>
        <span>{unit.track}</span>
        <span>레벨 {unit.level}</span>
        <span>약 {unit.estimatedMinutes}분</span>
        {unit.draft ? <span className="draft-label">초안</span> : null}
      </div>

      <div className={styles.steps} aria-label="학습 단계">
        {STEPS.map((s, i) => (
          <span
            key={s.id}
            className={styles.stepPill}
            data-active={s.id === step}
            data-done={i < stepIndex}
          >
            {s.label}
          </span>
        ))}
      </div>

      <div key={step} className={`step-enter ${styles.panel}`}>
        {step === "problem" && (
          <>
            <h2>Problem</h2>
            <MarkdownLite source={unit.problem} className="prose" />
            <div className={styles.actions}>
              <button type="button" className="btn" onClick={() => go("explore")}>
                Explore로
              </button>
            </div>
          </>
        )}

        {step === "explore" && (
          <>
            <h2>Explore</h2>
            <MarkdownLite source={unit.explore} className="prose" />
            <div className={styles.actions}>
              <button type="button" className="btn btn-ghost" onClick={() => go("problem")}>
                뒤로
              </button>
              <button type="button" className="btn" onClick={() => go("decide")}>
                Decide로
              </button>
            </div>
          </>
        )}

        {step === "decide" && (
          <>
            <h2>Decide</h2>
            <p className="prose">{unit.decidePrompt}</p>
            <div className={styles.options} role="list">
              {unit.options.map((option) => {
                let state: "correct" | "wrong" | undefined;
                if (answered && selected === option.id) {
                  state = option.correct ? "correct" : "wrong";
                } else if (answered && option.correct) {
                  state = "correct";
                }
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={styles.option}
                    data-state={state}
                    disabled={answered}
                    onClick={() => onSelect(option.id)}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {answered && selectedOption ? (
              <div className={`step-enter ${styles.feedback}`} role="status">
                <p>{selectedOption.feedback}</p>
              </div>
            ) : null}
            <div className={styles.actions}>
              <button type="button" className="btn btn-ghost" onClick={() => go("explore")}>
                뒤로
              </button>
              <button
                type="button"
                className="btn"
                disabled={!answered}
                onClick={() => go("reflect")}
              >
                Reflect로
              </button>
            </div>
          </>
        )}

        {step === "reflect" && (
          <>
            <h2>Reflect</h2>
            <MarkdownLite source={unit.reflect} className="prose" />
            <div className={styles.actions}>
              <Link className="btn btn-ghost" href="/learn">
                목록으로
              </Link>
              {unit.recommendedNext ? (
                <Link
                  className="btn"
                  href={`/learn/${unit.recommendedNext}`}
                  onClick={() => void persist({ step: "completed" })}
                >
                  추천 다음 유닛
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn"
                  onClick={() => void persist({ step: "completed" })}
                >
                  완료로 표시
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {persistNote ? <p className={styles.note}>{persistNote}</p> : null}
    </article>
  );
}
