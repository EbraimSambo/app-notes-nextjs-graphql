import React, { useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";
import { useGetNotes, useGetNotesDeleted } from '../hooks/get-notes';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../../ui/skeleton';

const Trash = () => {
    const { data: sessionData, status: sessionStatus } = useSession();
    const userId = sessionData?.user?.id ? +sessionData.user.id : null;
    
    const { data, loading } = useGetNotesDeleted(userId!);
    const [items, setItems] = useState<Array<{ title: string; content: string }>>([]);

    useEffect(() => {
        if (data?.notesDeleted) {
            setItems(data.notesDeleted);
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
    console.log(data)
    return (
        <div className="mt-8">
            <div className="my-4">
                <h2 className='text-2xl font-black to-slate-400'>Notas Recicladas</h2>
            </div>
            <List
                values={items}
                onChange={({ oldIndex, newIndex }) => setItems(arrayMove(items, oldIndex, newIndex))}
                renderList={({ children, props }) => (
                    <ul className="w-full grid gap-2 grid-cols-4" {...props}>{children}</ul>
                )}
                renderItem={({ value, props }) => (
                    <li {...props} className="space-y-2 p-4 border bg-white rounded-sm cursor-grab shadow-md">
                        <h2>{value.title}</h2>
                        <p className="text-slate-600">{value.content}</p>
                    </li>
                )}
            />
        </div>
    );
};

export default Trash;
