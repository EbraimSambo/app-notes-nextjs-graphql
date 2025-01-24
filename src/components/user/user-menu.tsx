"use client"
import { useSession } from 'next-auth/react';
import React from 'react'
import Avatar from 'react-avatar';
import { Skeleton } from '../ui/skeleton';

const UserMenu = () => {
    const {data,status} = useSession();
    if(status == "loading") return <Skeleton className='bg-slate-500 w-10 h-10 rounded-full' />
  return (
    <div>
        <div className="h-10 w-10">
             <Avatar name={data?.user.name}  size='100%' className='text-sm w-full'   round={true}  />
        </div>
       
    </div>
  )
}

export default UserMenu