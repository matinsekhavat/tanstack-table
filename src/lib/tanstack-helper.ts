import { User } from "@/services/data";
import { ColumnDef } from "@tanstack/react-table";

export const tableCols: ColumnDef<User>[] = [
  {
    accessorKey: "firstName", // Add this line
    header: "First Name",
  },
  {
    accessorKey: "lastName", // Add this line
    header: "Last Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "visits",
    header: "Visits",
  },
  {
    accessorKey: "progress",
    header: "Progress",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
