"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status, data } = useSession();

  const isAdmin = data?.user.isAdmin;

  const router = useRouter();

  if (status === "authenticated" && isAdmin) router.replace("/admin");

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h3>Merhaba</h3>
      <Button asChild>
        <Link href="/create-appointment">Randevu Al</Link>
      </Button>
      <Link href="/profile" className="mt-20">
        Profil
      </Link>
      <Link href="/login" className="mt-20">
        Giriş Yap
      </Link>
    </main>
  );
}
