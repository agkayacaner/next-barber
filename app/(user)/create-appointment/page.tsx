"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format, Locale } from "date-fns";
import tr from "date-fns/locale/tr";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { Barber, Service, WorkingHours } from "@/types/types";

const CreateAppointment = () => {
  const router = useRouter();
  const { data: auth } = useSession();

  const user = auth?.user;

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date>();
  const formattedDate = date && format(date, "dd-MM-yyyy", { locale: tr });

  const [selectedBarber, setSelectedBarber] = React.useState<number>();
  const [selectedService, setSelectedService] = React.useState<number>();
  const [selectedHour, setSelectedHour] = React.useState<string>("");
  const [note, setNote] = React.useState<string>("");

  const {
    isPending,
    error,
    data: barbers,
  } = useQuery<Barber[]>({
    queryKey: ["barbers"],
    queryFn: () =>
      fetch("http://localhost:3000/api/barbers").then((res) => res.json()),
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: () =>
      fetch("http://localhost:3000/api/services").then((res) => res.json()),
  });

  const { data: workingHours } = useQuery<WorkingHours[]>({
    queryKey: ["workingHours"],
    queryFn: () =>
      fetch("http://localhost:3000/api/workingHours").then((res) => res.json()),
  });

  const handleAppointment = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: selectedService as number,
          date: formattedDate,
          hour: selectedHour,
          barberId: selectedBarber as number,
          userEmail: user?.email,
          note: note,
        }),
      });
      const data = await res.json();
      toast.success("Randevu oluşturuldu.");
      router.push("/appointments");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!user?.phoneNumber) {
      router.push("/update-phone");
    }
  }, [user]);

  if (isPending) return <div>Loading...</div>;

  return (
    <div>
      <Card className="w-72">
        <CardHeader>
          <CardTitle>Randevu Oluştur</CardTitle>
          <CardDescription>
            Gerekli bilgileri doldurarak randevu oluşturabilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "d MMMM yyyy", { locale: tr }) : "Tarih"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
                disabled={(date) => date.getDay() === 0}
                locale={tr}
                fromDate={new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* Select Barber */}
          <Select onValueChange={(value) => setSelectedBarber(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Berber Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="p-2 text-muted-foreground text-xs">
                  Berberler
                </SelectLabel>

                {barbers?.map((barber) => (
                  <SelectItem
                    key={barber.id}
                    value={barber.id}
                    onClick={() => setSelectedBarber(barber.id)}
                  >
                    {barber.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Select WorkingHour */}
          <Select onValueChange={(value) => setSelectedHour(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Saat Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="p-2 text-muted-foreground text-xs">
                  Uygun Saatler
                </SelectLabel>
                {workingHours?.map((workingHour) => (
                  <SelectItem
                    key={workingHour.id}
                    value={workingHour.hour}
                    onClick={() => setSelectedHour(workingHour.hour)}
                  >
                    {workingHour.hour}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Select Service */}
          <Select onValueChange={(value) => setSelectedService(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Hizmet Seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="p-2 text-muted-foreground text-xs">
                  Hizmetler
                </SelectLabel>
                {services?.map((service) => (
                  <SelectItem
                    key={service.id}
                    value={service.id}
                    onClick={() => setSelectedService(service.id)}
                  >
                    {service.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Note */}
          <Textarea
            placeholder="Notunuz varsa ekleyin."
            onChange={(e) => setNote(e.target.value)}
          />

          <Button className="justify-center" onClick={handleAppointment}>
            Randevu Oluştur
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAppointment;
