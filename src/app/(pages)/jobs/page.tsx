import { JobCard } from "@/app/components/jobCard";

export default function Jobs() {

    return (
      <div className="w-full">
          <div className="bg-red-500 w-full h-[10rem] items-center justify-center">
            <h1>Jobs</h1>
          </div>
        <section className="container mx-auto flex">
        <div className="flex flex-col md:flex-row gap-8 mt-8">
        <aside className="w-full h-fit md:w-[20rem] bg-green-500 p-3 rounded-md">
        <div>
      <div className="mb-2 flex justify-between">
        <p>Filtres</p>
        <p>Clear filtres</p>
      </div>
      <div>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Type de contrat</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="cdi" /> */}
                <input type="checkbox" name="" id="cdi" />
                <label htmlFor="cdi">CDI</label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="cdd" /> */}
                <input type="checkbox" name="" id="cdd" />
                <label htmlFor="cdd">CDD</label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="freelance" /> */}
                <input type="checkbox" name="" id="freelance" />
                <label htmlFor="freelance">Freelance</label>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Niveau d&apos;expérience</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="junior" /> */}
                <input type="checkbox" name="" id="junior" />
                <label htmlFor="junior">Junior</label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="intermediaire" /> */}
                <input type="checkbox" name="" id="" />
                <label htmlFor="intermediaire">Intermédiaire</label>
              </div>
              <div className="flex items-center space-x-2">
                {/* <Checkbox id="senior" /> */}
                <input type="checkbox" name="" id="senior" />
                <label htmlFor="senior">Senior</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </aside>
        <main className="w-full ">
          <div className="flex items-center justify-between">
            <span>Showing 6-9 of 10 results</span>
            <select name="" id="" className="p-1 rounded-md text-black">
              <option value="5">Sort by lastest</option>
              <option value="">5</option>
            </select>

          </div>
            <div className="job_component mt-5">
              <JobCard/>
              <JobCard/>
              <JobCard/>
              <JobCard/>
              <JobCard/>
              <JobCard/>
            </div>
        </main>
      </div>
      </section>
      </div>
    );
  }