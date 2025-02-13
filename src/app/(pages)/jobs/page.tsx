"use client"
import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import {useEffect, useState} from "react"
import axios from "axios";
import SearchBar from "@/app/components/searchBar";
import { useSearchParams } from "next/navigation";


export default function Jobs() {
  const searchParams = useSearchParams()
  const initialSearchTerm = searchParams.get("search") || ""

  const [getJobs, setJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)

  useEffect(() => {
    setSearchTerm(initialSearchTerm)
  }, [initialSearchTerm])
  const URL:string ="http://localhost:5800/";

    useEffect(()=>{
          const getAllJobs =async()=>{
      const jobs = await axios.get(URL+"api/jobs");
      // console.log(jobs);
      if(jobs.status == 200){
        const {data} = jobs;
        setJobs(data.jobs)
        console.log(data.jobs)
      }
    }
    getAllJobs();
    },[])
    const handleSearch = (term: string) => {
      setSearchTerm(term)
      setCurrentPage(1)
    }

    return (
      <div className="w-full">
         <HeaderComponent pageName="Jobs"/>
         
        <section className="container mx-auto flex flex-col p-3">

          <h1 className="text-3xl font-bold mb-8">Offres d&apos;emploi disponibles</h1>
          <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full h-fit md:w-[20rem] rounded-md">
        <Card className="p-3">
      <div className="mb-2 flex justify-between">
        <p>Filtres</p>
        <p>Clear filtres</p>
      </div>
      <CardContent>
        <div className="space-y-4">
        <div>
            <h3 className="font-semibold mb-2">Trier par</h3>
            <Select onValueChange={()=>{""}} value={"sortBy"}>
              <SelectTrigger className="w-full text-black">
                <SelectValue className="text-black" placeholder="Sélectionnez un tri" />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="recent">Plus récent</SelectItem>
                <SelectItem value="salary-high">Salaire décroissant</SelectItem>
                <SelectItem value="salary-low">Salaire croissant</SelectItem>
                <SelectItem value="company">Entreprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Type de contrat</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="cdi" />
                <Label htmlFor="cdi">CDI</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="cdd" />
                <Label htmlFor="cdd">CDD</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="freelance" />
                <Label htmlFor="freelance">Freelance</Label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Niveau d&apos;expérience</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="junior" />
                <Label htmlFor="junior">Junior</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="" />
                <Label htmlFor="intermediaire">Intermédiaire</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox name="" id="senior" />
                <Label htmlFor="senior">Senior</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
        </aside>
        <main className="w-full ">
        
          <div className="flex items-center justify-between">
            <span>Showing 6-9 of 10 results</span>
            {/* <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrer par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select> */}

          </div>
            <div className="job_component mt-5">
            {getJobs.length > 0 ? (
                getJobs.map((job) => <JobCard key={job.id} job={job} path="" />)
              ) : (
                <p>Aucun emploi trouvé.</p>
              )}
              
            </div>
        </main>
      </div>
      </section>
      </div>
    );
  }