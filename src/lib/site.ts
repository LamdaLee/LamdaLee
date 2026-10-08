export const siteConfig = {
  name: "Lamda",
  learnBrand: "Shaula",
  storyName: "Lambdascorpii",
  domain: "shaula.kr",
  description:
    "AI를 읽고·고르고·쓰는 법을 문제 단위로 익히는 Lamda의 개인 홈과 Shaula 학습 공간.",
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
