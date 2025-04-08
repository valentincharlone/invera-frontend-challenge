"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader as UITableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import type { UserType } from "@/lib/types";
import { fetchUsers } from "@/lib/api";
import { TableColumnHeader } from "./TableColmunHeader";
import { TableHeader } from "./TableHeader";
import { UserRow } from "./UserRow";
import { TablePagination } from "./TablePagination";
import { User } from "lucide-react";
import { createQueryString } from "@/utils/createQueyString";
import { useTableParams } from "@/hooks/useTableParams";

const TABLE_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "company", label: "Company" },
  { key: "status", label: "Status" },
  { key: "", label: "" },
];

export function MainTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { page, limit, search, sort, order, status } = useTableParams();

  const [users, setUsers] = useState<UserType[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState(search);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const { users, total } = await fetchUsers({
          page,
          limit,
          search,
          sort,
          order,
          status,
        });
        setUsers(users);
        setTotalUsers(total);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [page, limit, search, sort, order, status, refreshTrigger]);

  const totalPages = Math.ceil(totalUsers / limit);
  const startItem = totalUsers === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalUsers);

  const handleSort = (column: string) => {
    const newOrder = sort === column && order === "asc" ? "desc" : "asc";
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        _sort: column,
        _order: newOrder,
        page: 1,
      })}`
    );
  };

  const handleSearch = () => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        q: searchValue || null,
        page: 1,
      })}`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(
      `${pathname}?${createQueryString(searchParams, { page: newPage })}`
    );
  };

  const handleLimitChange = (value: string) => {
    router.push(
      `${pathname}?${createQueryString(searchParams, {
        limit: Number(value),
        page: 1,
      })}`
    );
  };

  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const renderLoadingSkeleton = () =>
    Array.from({ length: limit }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {Array.from({ length: 7 }).map((_, cellIndex) => (
          <TableCell key={`cell-${index}-${cellIndex}`} className="p-6">
            <div className="h-6 animate-pulse rounded bg-muted/20"></div>
          </TableCell>
        ))}
      </TableRow>
    ));

  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={7} className="h-24 text-center">
        No results found.
      </TableCell>
    </TableRow>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-[#5F5F5F] bg-card overflow-hidden">
        <TableHeader
          title="All Users"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
          handleKeyDown={handleKeyDown}
        />

        <div className="border">
          <Table>
            <UITableHeader className="hidden md:table-header-group">
              <TableRow>
                <TableHead className="pl-6">
                  <Checkbox className="rounded-[2px] w-3 h-3" />
                </TableHead>
                {TABLE_COLUMNS.map((column) => (
                  <TableColumnHeader
                    key={column.key}
                    column={column.key}
                    label={column.label}
                    handleSort={handleSort}
                  />
                ))}
              </TableRow>
            </UITableHeader>

            <UITableHeader className="md:hidden">
              <TableRow>
                <TableHead className="pl-6" colSpan={2}>
                  <div className="flex items-center space-x-2">
                    <Checkbox className="rounded-[2px] w-3 h-3" />
                    <User className="h-4 w-4 mr-1" />
                    <span>Name</span>
                  </div>
                </TableHead>
              </TableRow>
            </UITableHeader>

            <TableBody>
              {loading
                ? renderLoadingSkeleton()
                : users.length === 0
                ? renderEmptyState()
                : users.map((user, index) => (
                    <UserRow
                      key={user.id}
                      index={index}
                      user={user}
                      onUserDeleted={refreshData}
                      onUserUpdated={refreshData}
                    />
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <TablePagination
        totalUsers={totalUsers}
        page={page}
        limit={limit}
        totalPages={totalPages}
        startItem={startItem}
        endItem={endItem}
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
}
