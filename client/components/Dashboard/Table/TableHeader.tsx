"use client";

import type React from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TableHeaderProps {
  title: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export function TableHeader({
  title,
  searchValue,
  setSearchValue,
  handleKeyDown,
}: TableHeaderProps) {
  return (
    <div className="flex items-center gap-5 px-10 py-6">
      <h2 className="text-xl font-semibold text-white flex-shrink-0">
        {title}
      </h2>
      <div className="relative w-[352px] h-[42px] flex items-center">
        <Search className="absolute left-2.5 top-[50%] -translate-y-[50%] h-4 w-4 text-[#BABABA]" />
        <Input
          type="text"
          placeholder="Search for..."
          className="pl-8 rounded-[4px]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
