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
import { JobFilters } from "@/app/components/jobFilter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


export default function Jobs() {
  const searchParams = useSearchParams()
  const initialSearchTerm = searchParams.get("search") || ""
  const JOBS_PER_PAGE = 8;

  const [getJobs, setJobs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [sortBy, setSortBy] = useState("")
  const [contractTypes, setContractTypes] = useState({
    cdi: false,
    cdd: false,
    stage:false,
    freelance: false,
  })
  const [experienceLevels, setExperienceLevels] = useState({
    junior: false,
    intermediaire: false,
    senior: false,
  })
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
    },[]);

    const filterJob = getJobs?.filter((job)=>{
      if(searchTerm){
        const searchLower = searchTerm?.toLowerCase();
        return(
          job.title?.toLowerCase()?.includes(searchLower) ||
          job.description?.toLowerCase().includes(searchLower) ||
          job.company?.toLowerCase().includes(searchLower)
        );
        
      }
      return true;
    }).filter((job) => {
      if (Object.values(contractTypes).every((v) => !v)) return true
      return contractTypes[job?.jobType.toLowerCase() as keyof typeof contractTypes]
    }).sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "salary-high":
          return Number.parseInt(b.salary) - Number.parseInt(a.salary)
        case "salary-low":
          return Number.parseInt(a.salary) - Number.parseInt(b.salary)
        case "company":
          return a.company.localeCompare(b.company)
        default:
          return 0
      }
    })


    const handleSortChange = (value: string) => {
      setSortBy(value)
      // setCurrentPage(1)
    }
    const handleContractTypeChange = (type: keyof typeof contractTypes) => {
      setContractTypes((prev) => ({ ...prev, [type]: !prev[type] }))
      // setCurrentPage(1)
    }
  
    const handleExperienceLevelChange = (level: keyof typeof experienceLevels) => {
      setExperienceLevels((prev) => ({ ...prev, [level]: !prev[level] }))
      // setCurrentPage(1)
    }
    const handleSearch = (term: string) => {
      setSearchTerm(term)
      // setCurrentPage(1)
    }

    const clearFilters = () => {
      setSortBy("")
      setContractTypes({
        cdi: false,
        cdd: false,
        stage: false,
        freelance: false,
      })
      setExperienceLevels({
        junior: false,
        intermediaire: false,
        senior: false,
      })
      // setCurrentPage(1)
      setSearchTerm("")
    }

    const totalPages = Math.ceil(filterJob?.length / JOBS_PER_PAGE)
    const paginatedJobs = filterJob?.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE)
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page)
    }
    return (
      <div className="w-full">
         <HeaderComponent pageName="Jobs"/>
         
        <section className="container mx-auto flex flex-col p-3">

          <h1 className="text-3xl font-bold mb-8">Offres d&apos;emploi disponibles</h1>
          <SearchBar onSearch={handleSearch} initialSearchTerm={searchTerm} />

        <div className="flex flex-col md:flex-row gap-8 mt-8">
        {/* <aside className="w-full h-fit md:w-[20rem] rounded-md">
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
        </aside> */}
        <aside className="w-full h-fit md:w-[20rem] rounded-md">
        <JobFilters
            sortBy={sortBy}
            contractTypes={contractTypes}
            experienceLevels={experienceLevels}
            onSortChange={handleSortChange}
            onContractTypeChange={handleContractTypeChange}
            onExperienceLevelChange={handleExperienceLevelChange}
            onClearFilters={clearFilters}
          />
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
            {paginatedJobs.length > 0 ? (
                filterJob.map((job) => <JobCard key={job.id} job={job} path="" />)
              ) : (
                <p>Aucun emploi trouvé.</p>
              )}
              
            </div>
            <div className="pagination w-full">
            {totalPages > 6 && (
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Précédent
          </Button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
            </div>
        </main>
      </div>
      </section>
      </div>
    );
  }