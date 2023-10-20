"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UpdatePhone = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const router = useRouter();
  const user = useSession().data?.user.email;

  const handleUptadePhone = async () => {
    try {
      await fetch("http://localhost:3000/api/customers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user,
          phoneNumber: phoneNumber,
        }),
      });

      toast.success("Telefon numarası eklendi");
    } catch (err) {
      toast.error("Telefon numarası eklenemedi");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Telefon numarası</CardTitle>
          <CardDescription>
            Lütfen telefon numaranızı ekleyin. Randevu almak için telefon
            numarası gereklidir.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <Input
            type="tel"
            placeholder="Telefon"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <Button onClick={handleUptadePhone}>Ekle</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePhone;
