import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const appointments = await prisma.appointment.findMany();
        return new NextResponse(JSON.stringify(appointments), { status: 200 });
      }
      const appointments = await prisma.appointment.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(appointments), { status: 200 });
    } catch (e) {
      return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
        status: 500,
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "Yetkisiz" }), {
      status: 401,
    });
  }
};

export const POST = async () => {
  return new NextResponse("Merhaba", { status: 200 });
};
