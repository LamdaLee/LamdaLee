"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/about", label: "소개" },
  { href: "/work", label: "작업" },
  { href: "/learn", label: "배우기" },
  { href: "/contact", label: "연락" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          Shau<span className={styles.brandMark}>la</span>
        </Link>
        <nav className={styles.nav} aria-label="주요">
          {links.map((link) => {
            const current =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
