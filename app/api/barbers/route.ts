import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async () => {
  try {
    const barbers = await prisma.barber.findMany();
    return new NextResponse(JSON.stringify(barbers), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
      status: 500,
    });
  }
};

export const POST = async () => {
  return new NextResponse("Merhaba", { status: 200 });
};
