import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import styles from "../page-content.module.css";

export const metadata: Metadata = {
  title: "연락",
  description: "Lamda에게 연락하기.",
};

export default function ContactPage() {
  return (
    <div className={`shell ${styles.page}`}>
      <p className={styles.eyebrow}>연락</p>
      <h1 className={styles.title}>
        연결하기
        <span className="draft-label">초안</span>
      </h1>
      <div className={`prose ${styles.body}`}>
        <p>
          협업·채용·학습 공간 피드백은 아래로 보내 주세요. (채널 우선순위는 아직
          확정 전이라 플레이스홀더입니다.)
        </p>
        <ul>
          <li>
            이메일:{" "}
            <a className="link-warm" href={`mailto:${siteConfig.links.email}`}>
              {siteConfig.links.email}
            </a>
          </li>
          <li>
            GitHub:{" "}
            <a
              className="link-warm"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.links.github.replace("https://", "")}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
