import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { tr } from "date-fns/locale";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async () => {
  try {
    const serivces = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
    });
    return new NextResponse(JSON.stringify(serivces), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
      status: 500,
    });
  }
};

export const POST = async () => {
  return new NextResponse("Merhaba", { status: 200 });
};
