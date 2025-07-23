"use client";

import Image from "next/image";
import Form from "next/form";
import { storeInDb } from "./lib/calc";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] scheme-dark sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-[32px] sm:items-start">
        <Image
          className=""
          src="/immoly_logo_black_background.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Form action={storeInDb}>
          <div className="flex flex-col gap-2">
            <label htmlFor="capital">Eigenkapital</label>
            <input
              type="number"
              className="rounded-lg border border-stone-700"
              id="captital"
              name="capital"
            />
            <label htmlFor="creditSum">Kaufsumme</label>
            <input
              type="number"
              className="rounded-lg border border-stone-700"
              id="creditSum"
              name="creditSum"
            />
            <label htmlFor="interestRate">Zins</label>
            <input
              type="decimal"
              className="rounded-lg border border-stone-700"
              id="interestRate"
              name="interestRate"
              max="20"
              min="0.1"
            />
            <label htmlFor="rent">Miete</label>
            <input
              type="number"
              className="rounded-lg border border-stone-700"
              id="rent"
              name="rent"
            />
            <label htmlFor="monthlyRate">Monatsrate</label>
            <input
              type="number"
              className="rounded-lg border border-stone-700"
              id="monthylRate"
              name="monthlyRate"
            />
            <button type="submit" />
          </div>
        </Form>
        <ul className="list-inside text-center font-[family-name:var(--font-geist-mono)] text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            <Link href="/graph">
              Show results{" "}
              <code className="rounded bg-black/[.05] px-1 py-0.5 font-[family-name:var(--font-geist-mono)] font-semibold dark:bg-white/[.06]">
                -&gt;
              </code>
            </Link>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-[24px]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
