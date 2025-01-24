"use client"
import Noteform from '@/components/notes/partials/note-form'
import UserMenu from '@/components/user/user-menu'
import { useMenu } from '@/config/jotai/atoms'
import { Menu, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaNoteSticky } from 'react-icons/fa6'
const Header = () => {
    const [, setMenu] = useMenu()
    return (
        <header className='fixed bg-white z-20 top-0 ring-0 left-0 shadow-md w-full px-4 py-2'>
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => setMenu((prev) => !prev)} className="h-12 w-12 justify-center flex items-center bg-gray-100 rounded-full">
                        <Menu className='h-6 w-6' />
                    </button>
                    <Link href={"/"} className="flex items-center gap-1">
                        <FaNoteSticky className='h-6 w-6 text-primary' />
                        <h2 className='text-slate-600 '>Guardar</h2>
                    </Link>
                </div>
                <div className="flex items-center gap-2 max-w-[600px] w-full">
                    <div className="h-[40px] px-2 bg-slate-200 flex items-center gap-2 rounded-md  w-full ">
                        <Search className='text-slate-600' />
                        <input placeholder='Pesquisar por notas...' className='text-sm text-slate-600 h-full w-full bg-transparent border-none outline-none' type="text" />
                    </div>
                    <Noteform />
                </div>
                <UserMenu />
            </nav>

        </header>
    )
}

export default Header