"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TablePaginationProps {
  totalUsers: number;
  page: number;
  limit: number;
  totalPages: number;
  startItem: number;
  endItem: number;
  handlePageChange: (page: number) => void;
  handleLimitChange: (value: string) => void;
}

export function TablePagination({
  totalUsers,
  page,
  limit,
  totalPages,
  startItem,
  endItem,
  handlePageChange,
  handleLimitChange,
}: TablePaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:flex-row">
      <div className="text-sm text-muted-foreground">
        {totalUsers > 0
          ? `${startItem} - ${endItem} of ${totalUsers}`
          : "0 results"}
      </div>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
