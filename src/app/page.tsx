'use client';

import Image from "next/image";
import Form from 'next/form';
import { calc } from "./calc";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className=""
          src="/immoly_logo_black_background.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Form action={calc}>
          <div className="flex gap-2 flex-col">
            <label htmlFor="capital">Eigenkapital</label>
            <input type="number" className="border-stone-700 border rounded-lg" id="captital" name="capital" />
            <label htmlFor="creditSum">Kaufsumme</label>
            <input type="number" className="border-stone-700 border rounded-lg" id="creditSum" name="creditSum" />
            <label htmlFor="interestRate">Zins</label>
            <input type="number" className="border-stone-700 border rounded-lg" id="interestRate" name="interestRate" />
            <label htmlFor="rent">Miete</label>
            <input type="number" className="border-stone-700 border rounded-lg" id="rent" name="rent" />
            <label htmlFor="monthlyRate">Monatsrate</label>
            <input type="number" className="border-stone-700 border rounded-lg" id="monthylRate" name="monthlyRate" />
            <button type="submit" />
          </div>
        </Form>
        <ul className="list-inside text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            <Link href="/graph">
              Show results{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              -&gt;
              </code>
            </Link>
          </li>
        </ul>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
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
