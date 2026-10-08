import type { Metadata } from "next";
import Link from "next/link";
import { AuthPanel } from "@/components/AuthPanel";
import { getAllChallenges } from "@/lib/learn/load";
import { siteConfig } from "@/lib/site";
import styles from "../page-content.module.css";
import learnStyles from "./learn.module.css";

export const metadata: Metadata = {
  title: "배우기",
  description: `AI 리터러시 챌린지 유닛 목록 — ${siteConfig.name}.`,
};

export default function LearnPage() {
  const challenges = getAllChallenges();

  return (
    <div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>배우기</p>
      <h1 className={styles.title}>문제 단위로 익히는 AI 리터러시</h1>
      <p className={styles.lede}>
        영상 덤프가 아니라 Problem → Explore → Decide → Reflect. 객관식은 즉시
        피드백이 이어집니다.
      </p>

      <ul className={learnStyles.list}>
        {challenges.map((unit) => (
          <li key={unit.slug}>
            <Link href={`/learn/${unit.slug}`} className={learnStyles.item}>
              <div className={learnStyles.meta}>
                <span>{unit.track}</span>
                <span>레벨 {unit.level}</span>
                <span>{unit.estimatedMinutes}분</span>
                {unit.draft ? <span className="draft-label">초안</span> : null}
              </div>
              <h2>{unit.title}</h2>
              <p>{unit.summary}</p>
            </Link>
          </li>
        ))}
      </ul>

      <AuthPanel />
    </div>
  );
}
