"use client";

import type React from "react";
import { useState } from "react";
import type { UserType } from "@/lib/types";
import { updateUser, createUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserIcon,
  Mail,
  Building2,
  UserCheck,
  Phone,
  MapPin,
} from "lucide-react";
import { toast } from "react-hot-toast"; //

interface UserDialogProps {
  user: UserType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "edit" | "create";
  onSuccess?: () => void;
}

export function UserDialog({
  user,
  open,
  onOpenChange,
  mode,
  onSuccess,
}: UserDialogProps) {
  const [formData, setFormData] = useState<Partial<UserType>>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    company: user?.company || "",
    status: user?.status || "Offline",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<UserType>) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev: Partial<UserType>) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData: Omit<UserType, "id"> = {
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        location: formData.location || "",
        company: formData.company || "",
        status: formData.status || "Offline",
      };

      if (mode === "edit" && user) {
        await updateUser(user.id, userData);
        toast.success("User updated", { duration: 5000 });
      } else {
        await createUser(userData);
        toast.success("User created", { duration: 5000 });
      }

      if (onSuccess) {
        onSuccess();
      }

      onOpenChange(false);
    } catch (error) {
      toast.error("Error", { duration: 5000 });
      throw new Error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[525px] bg-black">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {mode === "edit" ? "Edit User" : "Create User"}
            </DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Make changes to the user information here."
                : "Fill in the details to create a new user."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-5 py-4">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    className="pl-9"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="pl-9"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    className="pl-9"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="location" className="text-sm font-medium">
                  Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    name="location"
                    className="pl-9"
                    placeholder="New York, USA"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="company"
                    name="company"
                    className="pl-9"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                  >
                    <SelectTrigger id="status" className="pl-9">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-[#7B99FF] hover:bg-[#6A85E5] text-white"
              >
                {isLoading
                  ? "Saving..."
                  : mode === "edit"
                  ? "Update user"
                  : "Create user"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
