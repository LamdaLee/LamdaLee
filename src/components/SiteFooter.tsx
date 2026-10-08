import Link from "next/link";
import { siteConfig } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <p className={styles.story}>
          <strong>{siteConfig.name}</strong> — {siteConfig.person}가 만드는 AI
          리터러시 학습·포트폴리오 공간. 스토리 이름 {siteConfig.storyName} —
          전갈자리의 별처럼, 차갑지 않은 빛으로 접근성을 넓힙니다.
        </p>
        <div className={styles.meta}>
          <span>{siteConfig.domain}</span>
          <Link href="/learn">배우기 시작</Link>
          <Link href="/contact">연락</Link>
        </div>
      </div>
    </footer>
  );
}
