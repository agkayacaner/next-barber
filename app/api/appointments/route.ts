import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.isAdmin) {
        const appointments = await prisma.appointment.findMany({
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
        });
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

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const { serviceId, date, hour, barberId, userEmail, note } =
        await req.json();
      const appointment = await prisma.appointment.create({
        data: {
          serviceId,
          date,
          hour,
          barberId,
          userEmail,
          note,
        },
      });
      return new NextResponse(JSON.stringify(appointment), { status: 201 });
    } catch (err) {
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
