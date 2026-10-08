import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "../page-content.module.css";

export const metadata: Metadata = {
  title: "소개",
  description: `${siteConfig.person}와 ${siteConfig.name}, ${siteConfig.storyName} 스토리.`,
};

export default function AboutPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>소개</p>
      <h1 className={styles.title}>
        {siteConfig.person}
        <span className="draft-label">초안</span>
      </h1>
      <div className={`prose ${styles.body}`}>
        <p>
          안녕하세요, <strong>{siteConfig.person}</strong>입니다. AI 리터러시
          접근성을 중심에 두고, 사이트 <strong>{siteConfig.name}</strong>를
          만듭니다. 화려한 강의 카탈로그보다, 현실적인 한 장면을 두고
          읽고·고르고·돌아보는 짧은 연습을 제공하는 쪽을 택했습니다.
        </p>
        <p>
          <strong>{siteConfig.name}</strong>는 전갈자리의 별 이름입니다. 도메인{" "}
          {siteConfig.domain}과 같이, 미래·기술·공간이되 차갑지 않은 온기를 담고
          싶습니다. 학습은 같은 브랜드 아래 <code>/learn</code> 경로에
          있습니다.
        </p>
        <p>
          스토리 이름 <strong>{siteConfig.storyName}</strong>는 about와 푸터
          내러티브에서만 등장합니다. 사이트 공식 이름은 {siteConfig.name}, 만든
          사람은 {siteConfig.person}입니다.
        </p>
        <p>
          (이 문단은 플레이스홀더입니다. {siteConfig.person}의 실제
          소개·경력 문구로 교체할 예정입니다.)
        </p>
      </div>
      <div className="btn-group" style={{ marginTop: "2rem" }}>
        <Link className="btn" href="/learn">
          배우기
        </Link>
        <Link className="btn btn-ghost" href="/work">
          작업 보기
        </Link>
      </div>
    </div>
  );
}
