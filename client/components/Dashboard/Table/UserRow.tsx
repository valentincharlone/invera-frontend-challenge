"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";
import type { UserType } from "@/lib/types";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteUser } from "@/lib/api";
import { UserDialog } from "../UserDialog";
import { toast } from "react-hot-toast";

interface UserRowProps {
  user: UserType;
  index: number;
  onUserDeleted: () => void;
  onUserUpdated: () => void;
}

export function UserRow({
  user,
  index,
  onUserDeleted,
  onUserUpdated,
}: UserRowProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteUser(user.id);
      toast.success("User deleted", {
        duration: 5000,
      });
      onUserDeleted();
    } catch (error) {
      toast.error("Error. Could not delete user.", {
        duration: 5000,
      });
      throw new Error(error as string);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUserUpdated = () => {
    onUserUpdated();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const isOnline = status === "Online";
    return (
      <Badge
        variant={isOnline ? "success" : "secondary"}
        className={`flex items-center w-fit gap-1 ${
          isOnline
            ? "bg-[#063207] text-[#C3F5CD] border-[.4px] border-[#C3F5CD80] rounded-[2px] font-normal text-[11px]"
            : "bg-[#333333] text-[#AAAAAA] border-[.4px] border-[#AAAAAA80] rounded-[2px] font-normal text-[11px]"
        }`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${
            isOnline ? "bg-[#C3F5CD]" : "bg-[#AAAAAA]"
          }`}
        ></div>
        {status}
      </Badge>
    );
  };

  return (
    <>
      <TableRow
        className={
          index % 2 === 1
            ? "bg-[#5F5F5F]/10 border-b border-[#5F5F5F]"
            : "border-[#5F5F5F]"
        }
      >
        <TableCell className="px-6 ">
          <Checkbox className="rounded-[2px] border border-[#5F5F5F] " />
        </TableCell>
        <TableCell className="py-4 pl-2 md:pl-0">
          <div className="flex items-center space-x-3">
            <div className="relative w-[28px] h-[28px] md:w-[40px] md:h-[40px] rounded-full overflow-hidden">
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random`}
                alt={user.name}
                fill
                sizes="(max-width: 768px) 28px, 40px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-[#FCFCFC] text-[11px]">
                {user.name}
              </p>
              <p className="text-[11px]  text-[#BABABA]">{user.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell text-[#BABABA]">
          {user.phone}
        </TableCell>
        <TableCell className="hidden md:table-cell text-[#BABABA]">
          {user.location}
        </TableCell>
        <TableCell className="hidden md:table-cell text-[#BABABA]">
          <div className="flex items-center space-x-2">
            <span>{user.company}</span>
          </div>
        </TableCell>
        <TableCell>
          <StatusBadge status={user.status} />
        </TableCell>
        <TableCell className="text-right pr-[24px] md:pr-[50px]">
          <div className="flex justify-end gap-2">
            <Button
              className="w-fit hover:bg-none"
              variant="ghost"
              size="icon"
              onClick={handleEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              className="w-fit"
              variant="ghost"
              size="icon"
              onClick={handleDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <UserDialog
        user={user}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        mode="edit"
        onSuccess={handleUserUpdated}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente al usuario{" "}
              <span className="font-bold">{user.name}</span> y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
