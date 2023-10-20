"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Appointment } from "@/types/types";

export const columns: ColumnDef<Appointment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "date",
    header: "Tarih",
  },
  {
    accessorKey: "hour",
    header: "Saat",
  },
  {
    accessorKey: "user.name",
    header: "Müşteri",
  },
  {
    accessorKey: "barber.name",
    header: "Berber",
  },
  {
    accessorKey: "service.name",
    header: "Hizmet",
  },
  {
    accessorKey: "status",
    header: "Durum",
  },
];
