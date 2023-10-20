"use client";
import { useSession } from "next-auth/react";
import Navbar from "./_components/navbar";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { stat } from "fs";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    router.replace("/login");
    return <div>Redirecting...</div>;
  }

  return (
    <div>
      <Navbar />
      <main className="p-5">{children}</main>
    </div>
  );
};

export default UserLayout;
