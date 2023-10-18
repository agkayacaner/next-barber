import { Appointment } from "@/types/types";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/appointments", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }
  console.log(res);
  return res.json();
};

const Appointments = async () => {
  // const appointments: Appointment[] = await getData();
  // console.log(appointments);

  return (
    <div>
      <h1>Appointments</h1>
      {/* {appointments.map((appointment) => {
        return (
          <div key={appointment.id}>
            <p>{appointment.date}</p>
            <p>{appointment.userEmail}</p>
          </div>
        );
      })} */}
    </div>
  );
};
export default Appointments;
