import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ChallengeMeta, ChallengeUnit, DecideOption } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/learn");

function splitSections(body: string) {
  const sections: Record<string, string> = {};
  const parts = body.split(/^##\s+/m).filter(Boolean);
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const title = (newline === -1 ? part : part.slice(0, newline)).trim();
    const content = (newline === -1 ? "" : part.slice(newline + 1)).trim();
    sections[title] = content;
  }
  return sections;
}

function parseUnit(slug: string, raw: string): ChallengeUnit {
  const { data, content } = matter(raw);
  const sections = splitSections(content);
  const options = (data.options as DecideOption[]) ?? [];

  return {
    slug,
    title: String(data.title),
    summary: String(data.summary),
    level: data.level as 1 | 2 | 3,
    track: data.track,
    estimatedMinutes: Number(data.estimatedMinutes ?? 5),
    draft: Boolean(data.draft),
    problem: sections.Problem ?? "",
    explore: sections.Explore ?? "",
    decidePrompt: String(data.decidePrompt ?? "가장 적절한 선택은?"),
    options,
    reflect: sections.Reflect ?? "",
    nextPrompt: "",
    recommendedNext: data.recommendedNext
      ? String(data.recommendedNext)
      : undefined,
  };
}

export function getChallengeSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getChallengeBySlug(slug: string): ChallengeUnit | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return parseUnit(slug, raw);
}

export function getAllChallenges(): ChallengeMeta[] {
  return getChallengeSlugs()
    .map((slug) => getChallengeBySlug(slug))
    .filter((unit): unit is ChallengeUnit => unit !== null)
    .map(
      ({
        slug,
        title,
        summary,
        level,
        track,
        estimatedMinutes,
        draft,
      }): ChallengeMeta => ({
        slug,
        title,
        summary,
        level,
        track,
        estimatedMinutes,
        draft,
      }),
    )
    .sort((a, b) => a.level - b.level || a.title.localeCompare(b.title, "ko"));
}
