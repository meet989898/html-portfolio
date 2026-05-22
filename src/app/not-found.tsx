import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f3ea] px-4 text-center text-black">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase text-[#d65a31]">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">This page is not here.</h1>
        <p className="mt-4 text-black/62">The portfolio moved things around during the redesign.</p>
        <Button asChild className="mt-7 rounded-full bg-black text-white hover:bg-black/85">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
