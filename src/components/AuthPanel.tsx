"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { getSupabaseEnv } from "@/lib/supabase/config";
import styles from "./AuthPanel.module.css";

export function AuthPanel() {
  const { configured } = getSupabaseEnv();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    void supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const supabase = createClient();
    if (!supabase) {
      setStatus("Supabase가 아직 연결되지 않았습니다. .env.local을 확인하세요.");
      return;
    }
    setStatus("매직 링크를 보내는 중…");
    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    setStatus(
      error
        ? `전송 실패: ${error.message}`
        : "이메일을 확인하세요. 링크를 누르면 이 사이트로 돌아옵니다.",
    );
  }

  async function signOut() {
    const supabase = createClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUserEmail(null);
    setStatus("로그아웃되었습니다.");
  }

  return (
    <section className={styles.panel} aria-labelledby="auth-heading">
      <h2 id="auth-heading">학습 진행 저장</h2>
      {!configured ? (
        <p className={styles.hint}>
          Supabase 환경 변수가 없으면 챌린지는 그대로 플레이할 수 있고, 진행은
          계정에 저장되지 않습니다. README의 설정 단계를 보세요.
        </p>
      ) : userEmail ? (
        <>
          <p className={styles.hint}>{userEmail}으로 로그인됨</p>
          <button type="button" className="btn btn-ghost" onClick={() => void signOut()}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <p className={styles.hint}>
            매직 링크로 로그인하면 Decide 제출과 진행이 Supabase에 저장됩니다.
          </p>
          <form className={styles.row} onSubmit={(e) => void onSubmit(e)}>
            <input
              className={styles.input}
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button className="btn" type="submit">
              매직 링크
            </button>
          </form>
        </>
      )}
      {status ? <p className={styles.status}>{status}</p> : null}
    </section>
  );
}
