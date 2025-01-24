import React from 'react'
import image from '@/assets/images/image-s.jpg'
import Link from 'next/link'
import { FaArrowRight, FaNoteSticky } from 'react-icons/fa6'
const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='grid grid-cols-2 h-[100vh] '>
            <div className="relative flex items-center justify-center flex-col bg-primary ">
                <div className="h-[100vh] w-full ">
                    <img src={image.src} className='w-full h-full object-cover' alt='' />
                </div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col gap-4">
                    <div className="flex items-center justify-between p-4 ">
                        <h1 className='font-bold text-white flex gap-1 items-center'>
                            <FaNoteSticky className='h-6 w-6 ' />
                            <span>GUARDA</span>
                        </h1>
                        <Link href={"/"} className='text-white items-center flex justify-center gap-2 bg-slate-100/5 rounded-full p-2 px-4'>
                            <span className='text-sm font-black'>Voltar</span>
                            <FaArrowRight />
                        </Link>
                    </div>
                    <h1 className='max-w-[350px] w-full mx-auto text-xl text-wrap font-black text-white text-center p-4'>
                        O melhor aplicativo para guardar as suas notas</h1>
                </div>
            </div>
            <div className='flex items-center justify-center h-[100vh] '>
                {children}
            </div>
        </div>
    )
}

export default layout