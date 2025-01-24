import React, { useEffect, useState } from 'react';
import { List, arrayMove } from "react-movable";
import { useGetNotes } from '../hooks/get-notes';
import { useSession } from 'next-auth/react';
import { Skeleton } from '../../ui/skeleton';
import DeleteNotes from './delete-notes';

const Notes = () => {
    const { data: sessionData, status: sessionStatus } = useSession();
    const userId = sessionData?.user?.id ? +sessionData.user.id : null;
    
    const { data, loading } = useGetNotes(userId!);
    const [items, setItems] = useState<Array<{ title: string; content: string, id: number, user_id: number, created_at: string }>>([]);

    useEffect(() => {
        if (data?.notes) {
            setItems(data.notes);
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
            <List
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
            />
        </div>
    );
};

export default Notes;
