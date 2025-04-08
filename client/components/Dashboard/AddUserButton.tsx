"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { UserType } from "@/lib/types";
import { UserDialog } from "./UserDialog";

export function AddUserButton() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const emptyUser: UserType = {
    id: 0,
    name: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    status: "",
  };

  return (
    <>
      <Button
        onClick={handleOpenCreateDialog}
        className="bg-[#7B99FF] text-white px-16 rounded-[4px]"
      >
        Add user
      </Button>

      <UserDialog
        user={emptyUser}
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        mode="create"
      />
    </>
  );
}
