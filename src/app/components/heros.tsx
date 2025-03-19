import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import React from 'react'
import SearchBar from './searchBar'
import { HomeSearchBar } from './home-search-bar'


const Heros = () => {
  return ( 
    <header className='bg-slate-500 bg-blend-multiply bg-contain bg-center md:bg-cover w-full  mb-5'>
      <div className="container mx-auto flex flex-col my-auto h-full justify-center items-center gap-4 p-3 md:p-5">
        <h1 className='md:text-6xl textShadow text-3xl text-center font-bold text-white'>Trouvez votre emploi idéal avec JobHunt</h1>
        <p className='md:text-md text-center text-white'>JobPortal vous connecte aux meilleures opportunités professionnelles. Inscrivez-vous dès aujourd&apos;hui et transformez votre carrière !</p>

        <HomeSearchBar/>
        <p className='text-center my-5 text-white'>Votre profil intéresse des entreprises. Indiquez-leur votre disponibilité.</p>
      </div>
    </header>
  )
}

export default Heros