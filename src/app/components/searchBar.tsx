"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (term: string) => void;
  initialSearchTerm?: string;
}

export default function SearchBar({
  onSearch,
  initialSearchTerm = "",
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex shadow-md flex-col md:flex-row shadow-black rounded-md search-box w-full justify-center items-center"
    >
      <div className=" w-full bg-white inline-flex gap-3 items-center p-4 rounded-md rounded-r-none">
        <Search className=" hidden md:block" />
        <Input
          type="text"
          className="w-full text-xl focus:outline-none focus:ring-0 shadow-none flex-grow p-1 border border-white focus:border-transparent text-black placeholder-slate-400"
          placeholder="cherchez un job par intitulé de poste, mot-clé ou entreprise"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <X
          onClick={() => setSearchTerm("")}
          className=" text-black cursor-pointer hidden md:block"
        />
      </div>
      <Button
        type="submit"
        className="inline-flex font-bold items-center gap-2 mb-2 md:mb-0 border h-[2.50rem] md:h-[4.25rem]  md:px-2 rounded-r-md md:rounded-l-none"
      >
        <Search className="h-4 w-4 mr-2" />
        Trouver un job
      </Button>
    </form>
  );
}
