"use client";

import { Appointment } from "@/types/types";
import { columns } from "./column";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";

const Appointments = () => {
  const { isPending, error, data } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: () =>
      fetch("http://localhost:3000/api/appointments").then((res) => res.json()),
  });

  return (
    <div>
      <h3></h3>

      <div>
        {isPending ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <DataTable columns={columns} data={data || []} />
        )}
      </div>
    </div>
  );
};

export default Appointments;
