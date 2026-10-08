export type LearnTrack = "읽기" | "쓰기" | "판단";

export type DecideOption = {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
};

export type ChallengeMeta = {
  slug: string;
  title: string;
  summary: string;
  level: 1 | 2 | 3;
  track: LearnTrack;
  estimatedMinutes: number;
  draft?: boolean;
};

export type ChallengeUnit = ChallengeMeta & {
  problem: string;
  explore: string;
  decidePrompt: string;
  options: DecideOption[];
  reflect: string;
  nextPrompt: string;
  recommendedNext?: string;
};
