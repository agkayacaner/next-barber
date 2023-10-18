"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Google ile giriş yap</button>
    </div>
  );
};

export default Login;
