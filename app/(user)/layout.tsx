"use client";
import { useSession } from "next-auth/react";
import Navbar from "./_components/navbar";
import { useRouter } from "next/navigation";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, loading } = useSession();
  const route = useRouter();

  if (loading) return <div>Loading...</div>;

  if (status === "unauthenticated") {
    route.replace("/");
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
