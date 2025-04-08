"use client";

import { ArrowUpDown } from "@/components/Icons/Icons";
import { TableHead } from "@/components/ui/table";
import { User, Phone, MapPin, Building, CheckSquare } from "lucide-react";

interface TableColumnHeaderProps {
  column: string;
  label: string;
  handleSort: (column: string) => void;
}

export function TableColumnHeader({
  column,
  label,
  handleSort,
}: TableColumnHeaderProps) {
  const getIcon = () => {
    switch (column) {
      case "name":
        return <User className="h-4 w-4 mr-1" />;
      case "phone":
        return <Phone className="h-4 w-4 mr-1" />;
      case "location":
        return <MapPin className="h-4 w-4 mr-1" />;
      case "company":
        return <Building className="h-4 w-4 mr-1" />;
      case "status":
        return <CheckSquare className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <TableHead className="cursor-pointer" onClick={() => handleSort(column)}>
      <div className="flex items-center space-x-1">
        {getIcon()}
        <span>{label}</span>
        <i className="pl-2">{column ? <ArrowUpDown /> : null}</i>
      </div>
    </TableHead>
  );
}
