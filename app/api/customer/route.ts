import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { id } = req.query;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        appointments: {
          select: {
            id: true,
            status: true,
            date: true,
            hour: true,
            note: true,
            serviceId: true,

            service: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },

            barber: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
      status: 500,
    });
  }
};
