"use client";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data } = useSession();

  return (
    <div className="space-y-5">
      <div>Ad: {data?.user.name}</div>
      <div>Eposta: {data?.user.email}</div>
      <div>Telefon: {data?.user.phoneNumber}</div>
    </div>
  );
};

export default Profile;
