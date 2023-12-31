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
      <Button asChild>
        <Link href="/create-appointment">Randevu Al</Link>
      </Button>
      {status === "authenticated" ? (
        <Link href="/profile" className="mt-20">
          Profil
        </Link>
      ) : (
        <Button variant="ghost" asChild>
          <Link href="/login" className="mt-20">
            Giriş Yap
          </Link>
        </Button>
      )}
    </main>
  );
}
