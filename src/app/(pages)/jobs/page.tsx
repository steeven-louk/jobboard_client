"use client"
import { HeaderComponent } from "@/app/components/headerComponent";
import { JobCard } from "@/app/components/jobCard";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function Jobs() {

    return (
      <div className="w-full">
         <HeaderComponent pageName="Jobs"/>
         
        <section className="container mx-auto flex">
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrer par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="recent">Recent</SelectItem>
              </SelectContent>
            </Select>

          </div>
            <div className="job_component mt-5">
              <JobCard path={""}/>
              <JobCard path={""}/>
              <JobCard path={""}/>
              <JobCard path={""}/>
              <JobCard path={""}/>
              <JobCard path={""}/>
            </div>
        </main>
      </div>
      </section>
      </div>
    );
  }