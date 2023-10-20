"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Customer = ({ params }: { params: { id: string } }) => {
  const { isPending, error, data } = useQuery<User[]>({
    queryKey: ["customers"],
    queryFn: () =>
      fetch("http://localhost:3000/api/customers").then((res) => res.json()),
  });

  const customer = data?.find((customer) => customer.id === params.id);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div>
        <Card className="">
          <CardHeader>Müşteri</CardHeader>
          <CardDescription className="px-5">
            <div className="flex items-center mb-5">
              {customer?.image && (
                <Avatar className="w-14 h-14 mr-2">
                  <AvatarImage src={customer?.image} />
                  <AvatarFallback>
                    {customer?.name?.split(" ").map((name) => name[0])}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="grid">
                <h3 className="text-2xl">{customer?.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {customer?.email}
                </div>
              </div>
            </div>
            <div>Telefon: {customer?.phoneNumber}</div>
          </CardDescription>
          <CardContent></CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>Randevular</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tarih</TableHead>
                  <TableHead>Saat</TableHead>
                  <TableHead>Hizmet</TableHead>
                  <TableHead>Berber</TableHead>
                  <TableHead>Durumu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customer?.appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.hour}</TableCell>
                    <TableCell>{appointment.service.name}</TableCell>
                    <TableCell>{appointment.barber.name}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
