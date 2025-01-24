import React from 'react'

interface Props {
    pageName:string
}

export const HeaderComponent = ({pageName}: Props) => {

    return (
        <>
        <div className="bg-black grid place-items-center w-full h-[10rem] items-center justify-center">
        <h1 className=' capitalize md:text-2xl font-bold text-white'>{pageName}</h1>
      </div>
        </>
    )
}
