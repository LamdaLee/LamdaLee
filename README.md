# Shaula

**Shaula** — AI 리터러시 학습·포트폴리오 사이트 (`shaula.kr`).  
만든 사람: **Lamda**. 스토리 이름: **Lambdascorpii** (about/푸터 내러티브만).  
학습 경로: `/learn` (같은 Shaula 브랜드). 콘텐츠 언어: 한국어.

스택: **Next.js (App Router) + TypeScript + MDX + Vercel**, 진행/인증은 **Supabase**.

## 로컬 실행

```bash
npm install
cp .env.example .env.local   # 선택 — 없어도 정적 페이지·챌린지 플레이 가능
npm run dev
```

- 앱: [http://localhost:3000](http://localhost:3000)
- 빌드 확인: `npm run build && npm start`

## 환경 변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | 진행 저장 시 | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 진행 저장 시 | anon public key |
| `NEXT_PUBLIC_SITE_URL` | 권장 | 매직 링크·OG용 absolute URL (로컬: `http://localhost:3000`) |

키가 없거나 placeholder면 사이트는 빌드·실행되고, 챌린지 루프(즉시 피드백)는 클라이언트에서 동작합니다. 로그인/DB 저장만 비활성입니다.

## Supabase 설정

1. [Supabase](https://supabase.com) 프로젝트 생성
2. Authentication → Providers → Email (매직 링크) 활성화
3. Authentication → URL configuration에 Redirect URL 추가  
   - `http://localhost:3000/auth/callback`  
   - `https://shaula.kr/auth/callback`
4. SQL Editor에서 `supabase/migrations/001_init.sql` 실행  
   - 테이블: `learn_progress`, `learn_submissions` (+ RLS)
5. Project Settings → API 값을 `.env.local` / Vercel env에 입력

## 콘텐츠 (MDX)

챌린지 유닛: `content/learn/*.mdx`

- frontmatter: `title`, `summary`, `level`, `track`, `estimatedMinutes`, `decidePrompt`, `options`, `recommendedNext`, `draft`
- 본문 섹션: `## Problem`, `## Explore`, `## Reflect`
- Decide는 객관식 + **즉시 피드백** (클라이언트)

## Vercel + shaula.kr

1. GitHub 레포를 Vercel에 import
2. Framework preset: Next.js
3. Environment Variables에 Supabase·`NEXT_PUBLIC_SITE_URL=https://shaula.kr` 설정
4. Domains에 `shaula.kr` (및 www→apex 리다이렉트 권장) 연결
5. 학습 경로는 서브도메인 없이 **`/learn`**

## 페이지

| 경로 | 내용 |
|------|------|
| `/` | Shaula 히어로 + CTA |
| `/about` | 만든 사람 Lamda · Lambdascorpii 스토리 (초안) |
| `/work` | 케이스 ≤3 (플레이스홀더) |
| `/learn` | 챌린지 목록 + 매직 링크 패널 |
| `/learn/[slug]` | Problem → Explore → Decide → Reflect |
| `/contact` | 연락 — Lamda에게 (플레이스홀더) |

## 제품 의도

포트폴리오와 문제 단위 AI 리터러시 학습을 한 사이트에.  
브랜드: 사이트 **Shaula**, 사람 **Lamda**, 스토리명 **Lambdascorpii**(about/푸터만).
