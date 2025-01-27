"use client"
import React, { useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";
import { useGetNotes } from '../hooks/get-notes';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../../ui/skeleton';
import DeleteNotes from './delete-notes';
import image from '@/assets/images/ransom-note-letters-animate.svg'
import { Note } from '@/config/core/interfaces';
const Notes = () => {
    const { data: sessionData, status: sessionStatus } = useSession();
    const userId = sessionData?.user?.id ? +sessionData.user.id : null;
    
    const { data, loading } = useGetNotes(userId!);

    const [items, setItems] = useState<Array<{ title: string; is_delete: boolean, content: string, id: number, user_id: number, created_at: string }>>([]);
    const notes = data?.notes.filter((note)=>!note.user_id)
    useEffect(() => {
        if (data?.notes) {
            setItems(notes as Note[]);
        }
    }, [data]);

    if (sessionStatus === "loading" || loading) {
        return (
            <div className="grid grid-cols-3 gap-2 mt-8">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="bg-slate-400 h-[200px] w-full" />
                ))}
            </div>
        );
    }

    return (
        <div className="mt-8">
           {data &&  notes?.length != 0 && <List
                values={items}
                onChange={({ oldIndex, newIndex }) => setItems(arrayMove(items, oldIndex, newIndex))}
                renderList={({ children, props }) => (
                    <ul className="w-full grid gap-2 grid-cols-4" {...props}>{children}</ul>
                )}
                renderItem={({ value, props }) => (
                    <li {...props} className="space-y-2 p-4 border bg-white rounded-sm shadow-md">
                        <h2>{value.title}</h2>
                        <p className="text-slate-600">{value.content}</p>
                        <DeleteNotes note={value} />
                    </li>
                )}
            />}
            {data &&  notes?.length  == 0 && (
                <div className="w-full flex items-center justify-center h-[100vh] flex-col ">
                    <div className="max-w-[400px] h-[400px] w-full">
                        <img src={image.src} className='w-full h-full object-cover' alt="" />
                    </div>
                    <h2 className='font-bold text-xl text-slate-600 '>Nao existem notas criadas, comece a criar</h2>
                </div>
            )}
        </div>
    );
};

export default Notes;
