import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChallengePlayer } from "@/components/ChallengePlayer";
import { getChallengeBySlug, getChallengeSlugs } from "@/lib/learn/load";
import learnStyles from "../learn.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getChallengeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const unit = getChallengeBySlug(slug);
  if (!unit) return { title: "챌린지를 찾을 수 없습니다" };
  return {
    title: unit.title,
    description: unit.summary,
  };
}

export default async function ChallengePage({ params }: Props) {
  const { slug } = await params;
  const unit = getChallengeBySlug(slug);
  if (!unit) notFound();

  return (
    <div className={`shell ${learnStyles.unitPage}`}>
      <Link href="/learn" className={learnStyles.back}>
        ← Shaula 목록
      </Link>
      <h1 className={learnStyles.unitTitle}>{unit.title}</h1>
      <ChallengePlayer unit={unit} />
    </div>
  );
}
