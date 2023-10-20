export type Appointment = {
  id: number;
  serviceId: number;
  date: string;
  hour: string;
  barberId: number;
  userEmail: string;
  user: User;
  service: Service;
  status: number;
  note: string;
};

export type Barber = {
  id: number;
  name: string;
};

export type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
};

export type WorkingHours = {
  id: number;
  hour: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  appointments: Appointment[];
};
