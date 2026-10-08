import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page-content.module.css";
import workStyles from "./work.module.css";

export const metadata: Metadata = {
  title: "작업",
  description: "Shaula 프로젝트 하이라이트 (초안 플레이스홀더).",
};

const cases = [
  {
    title: "학습 루프",
    role: "제품 · 콘텐츠",
    blurb:
      "Problem → Explore → Decide → Reflect. AI 리터러시를 문제 단위로 연습하는 작은 학습 공간.",
    href: "/learn",
  },
  {
    title: "프로젝트 케이스 A",
    role: "디자인 · 엔지니어링",
    blurb:
      "(초안) 실제 작업물 제목·역할·배운 점으로 교체하세요. 깊이 있는 케이스 1개가 목록 5개보다 낫습니다.",
    href: "/contact",
  },
  {
    title: "프로젝트 케이스 B",
    role: "리서치",
    blurb:
      "(초안) 공개 가능한 범위의 결과물 링크와 한 줄 회고를 넣을 자리입니다.",
    href: "/contact",
  },
] as const;

export default function WorkPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>작업</p>
      <h1 className={styles.title}>
        깊게 보여줄 몇 가지
        <span className="draft-label">초안</span>
      </h1>
      <p className={styles.lede}>
        카드는 상호작용(케이스로 이동)을 위한 컨테이너로만 씁니다. 문구는
        플레이스홀더입니다.
      </p>
      <ul className={workStyles.list}>
        {cases.map((item) => (
          <li key={item.title}>
            <Link href={item.href} className={workStyles.card}>
              <span className={workStyles.role}>{item.role}</span>
              <h2>{item.title}</h2>
              <p>{item.blurb}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
