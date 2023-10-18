"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status, data } = useSession();
  const router = useRouter();

  const user = data?.user;

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>Merhaba</h3>
      <h1>{user?.name}</h1>
      <Button variant="destructive" onClick={(e) => signOut()}>
        Çıkış Yap
      </Button>
      <ModeToggle />
      {status === "unauthenticated" && <Link href="/login">Giriş yap</Link>}
    </main>
  );
}
