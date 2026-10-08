export const siteConfig = {
  name: "Shaula",
  person: "Lamda",
  storyName: "Lambdascorpii",
  domain: "shaula.kr",
  description:
    "AI를 읽고·고르고·쓰는 법을 문제 단위로 익히는 Shaula — Lamda의 학습·포트폴리오 공간.",
  locale: "ko_KR",
  links: {
    email: "hello@shaula.kr",
    github: "https://github.com/LamdaLee",
  },
} as const;

export function absoluteUrl(path = "/") {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://shaula.kr";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
