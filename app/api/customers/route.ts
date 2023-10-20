import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    // isAdmin: false olanları getir
    const users = await prisma.user.findMany({
      where: {
        isAdmin: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
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
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify({ message: "Bir Hata Oluştu" }), {
      status: 500,
    });
  }
};

export const POST = async () => {
  return new NextResponse("Merhaba", { status: 200 });
};

// Update Customer Phone Number
export const PUT = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const { email, phoneNumber } = await req.json();

      const user = await prisma.user.update({
        where: {
          email,
        },
        data: {
          phoneNumber,
        },
      });
      return new NextResponse(JSON.stringify(user), { status: 200 });
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
