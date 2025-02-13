"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

export function HomeSearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex search-box w-full justify-center items-center">
    <div className=' max-w-[40rem] w-full bg-white inline-flex gap-3 items-center p-4 rounded-md rounded-r-none'>
        <Search className='text-gray-600'/>
        <Input type="text" 
          className='w-full focus:outline-none flex-grow p-1 border-none text-black placeholder-slate-400'
          placeholder='cherchez un job par intitulé de poste, mot-clé ou entreprise' 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        <X onClick={()=>setSearchTerm("")} className=' text-black cursor-pointer'/>
        </div>
        <Button type="submit" className='inline-flex font-bold items-center gap-2 border h-[4.25rem]  px-2 rounded-r-md rounded-l-none bg-[#309689]'>
          <Search className='h-4 w-4 mr-2'/>
          Trouver un job
        </Button>
  </form>
  )
}

