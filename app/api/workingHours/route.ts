import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async () => {
  try {
    const workingHours = await prisma.workingHours.findMany();
    return new NextResponse(JSON.stringify(workingHours), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
      status: 500,
    });
  }
};

export const POST = async () => {
  return new NextResponse("Merhaba", { status: 200 });
};
