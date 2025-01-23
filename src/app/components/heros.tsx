import { Search, X } from 'lucide-react'
import React from 'react'


const Heros = () => {
  return ( 
    <header className='  w-full'>
      <div className="container mx-auto flex flex-col my-auto h-full justify-center items-center gap-4 p-3 md:p-5">
        <h1 className='md:text-5xl text-2xl text-center font-bold'>Trouvez votre emploi idéal avec JobHunt</h1>
        <p className='md:text-md text-center text-gray-400'>JobHunt vous connecte aux meilleures opportunités professionnelles. Inscrivez-vous dès aujourd&apos;hui et transformez votre carrière !</p>
        <div className="search-box w-full justify-center items-center flex">
          <div className=' max-w-[40rem] w-full bg-white inline-flex gap-3 items-center p-4 rounded-md rounded-r-none'>
          <Search className='text-gray-600'/>
          <input type="text" className='w-full focus:outline-none p-1 border-none text-black placeholder-slate-400' placeholder='cherchez un job par intitulé de poste, mot-clé ou entreprise' />
          <X className=' text-black cursor-pointer'/>
          </div>
          <button className='inline-flex font-bold items-center gap-2 border h-[4rem]  px-2 rounded-r-md bg-[#309689]'>
            <Search className=''/>
            Trouver un job
          </button>
        </div>
        <p className='text-center my-5'>Votre profil intéresse des entreprises. Indiquez-leur votre disponibilité.</p>
      </div>
    </header>
  )
}

export default Heros