"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./_components/navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { status, data } = useSession();

  const isAdmin = data?.user.isAdmin;
  const router = useRouter();

  if (status === "loading") return null;

  if (!isAdmin) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
