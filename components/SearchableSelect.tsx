"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchableSelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder = "Search...",
}: SearchableSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <div className="flex items-center px-3 pb-2">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-full border-0 p-0 focus-visible:ring-0"
          />
        </div>
        {filteredOptions.length === 0 ? (
          <div className="py-6 text-center text-sm text-muted-foreground">
            No results found.
          </div>
        ) : (
          filteredOptions
            .filter((option) => option.value.trim() !== "")
            .map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
        )}
      </SelectContent>
    </Select>
  );
}
