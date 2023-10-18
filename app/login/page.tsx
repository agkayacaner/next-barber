"use client";

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Google ile giriş yap</button>
    </div>
  );
};

export default Login;
