"use client"
import React from 'react'
import { abas } from '../data/tabs'
import { useMenu, useTabs } from '@/config/jotai/atoms'


const Sidebar = () => {
    const [tab, setTab] = useTabs()
     const [isOpenMenu,setMenu] = useMenu()
  return (
    <div className={`h-[100vh] ${isOpenMenu ? "max-w-[300px]" : "max-w-[80px]"} space-y-2  w-full shadow-sm border-r`}>
        <ul className='mt-[76px] flex flex-col gap-3 px-4 w-full'>
            {abas.map((aba,index)=>(
                <button onClick={()=>setTab({
                    tag: aba.tag as "notes" | "trash" | "remembers",
                    title: aba.title
                })} 
                key={index} 
                className={` ${aba.tag == tab.tag && "bg-green-100"} ${!isOpenMenu && "p-0 justify-center"} h-10 py-2 px-4 w-full rounded-full flex items-center gap-2 text-slate-600`}>
                     <aba.icon className='h-4 w-4' />
                   { isOpenMenu && <span className='text-sm'> {aba.title} </span>}
                </button>
            ))}
        </ul>
    </div>
  )
}

export default Sidebar