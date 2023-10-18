"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card>
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => signIn("google")}>
            <Image
              src="/google.svg"
              width={20}
              height={20}
              alt="Google"
              className="mr-2"
            />
            Google ile giriş yap
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
