import Link from "next/link";
import styles from "./Hero.module.css";

function ShaulaConstellation() {
  return (
    <svg
      className={styles.constellation}
      viewBox="0 0 420 320"
      role="img"
      aria-label="Shaula 별자리를 연상하는 성좌 일러스트"
    >
      <defs>
        <linearGradient id="lineWarm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0a35c" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#d4785c" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <g stroke="url(#lineWarm)" strokeWidth="1.25" fill="none">
        <path d="M70 240 L140 180 L210 210 L280 120 L340 95" />
        <path d="M140 180 L160 110 L210 210" />
        <path d="M280 120 L310 180 L340 95" />
      </g>
      {[
        [70, 240, 4],
        [140, 180, 5],
        [160, 110, 3.5],
        [210, 210, 4.5],
        [280, 120, 7],
        [310, 180, 3.5],
        [340, 95, 5.5],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={i === 4 ? "#f0b96a" : "#f4ebe0"}
          opacity={i === 4 ? 1 : 0.85}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.nebula} />
        <div className={styles.stars} />
        <ShaulaConstellation />
      </div>
      <div className={styles.content}>
        <p id="hero-brand" className={styles.brand}>
          Shau<span className={styles.brandAccent}>la</span>
        </p>
        <h1 className={styles.headline}>
          AI를 읽고, 고르고, 쓰는 법을 문제 단위로.
        </h1>
        <p className={styles.lede}>
          포트폴리오와 학습이 한곳에 있습니다. 강의 나열이 아니라, 짧은 판단
          연습으로 AI 리터러시 문턱을 낮춥니다.
        </p>
        <div className="btn-group">
          <Link className="btn" href="/learn/slack-ai-summary">
            첫 챌린지 시작
          </Link>
          <Link className="btn btn-ghost" href="/about">
            만든 사람
          </Link>
        </div>
      </div>
    </section>
  );
}
