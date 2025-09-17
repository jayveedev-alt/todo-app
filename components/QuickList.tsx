"use client";

import { db } from "@/lib/firebase";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Card from "./ui/card";
import { Icon } from "@iconify/react";
import { Button } from "./ui/button";
import { capitalizeFirst, dateFormatted, getStatusColor } from "@/lib/utils";

type QuickListProps = {
    userId: string;
    onEdit: (t: any) => void
    hasForm: (t: boolean) => void
    filters?: any;
}

export default function QuickList({ userId, onEdit, hasForm, filters }: QuickListProps) {
    const [todos, setTodos] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return

        const q = query(
            collection(db, 'todos'),
            where('uid', '==', userId),
            orderBy('createdAt', 'desc')
        )

        const unsub = onSnapshot(
            q,
            (snap) => {
                const arr: any[] = []
                snap.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }))
                setTodos(arr)
                setLoading(false)
            },
            (err) => {
                console.error('Snapshot error', err)
                setLoading(false)
            }
        )

        return () => unsub()
    }, [userId])

    async function remove(id: any) {
        if (!confirm('Delete this todo?')) return
        await deleteDoc(doc(db, 'todos', id))
    }

    const handleEdit = (item: any) => {
        onEdit(item);
        // hasForm(true);
    }

    const filteredTodos = todos.filter((todo) => {
        const matchesSearch =
            !filters.search || todo.title?.toLowerCase().includes(filters.search.toLowerCase());

        const matchesCategory =
            filters.category === "all" || todo.category === filters.category;

        const matchesPriority =
            filters.priority === "all" || todo.priority === filters.priority;

        const matchesStatus =
            filters.status === "all" || todo.status === filters.status;

        return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });

    return (
        <div>
            <div className="flex flex-row flex-wrap gap-4">
                {filteredTodos.map((item, index) => (
                    <div className="w-[250px] h-[250px] bg-[#fdf2b3] rounded-sm shadow-xl">
                        <div className="flex flex-col space-y-2 p-4">
                            <div>
                                <h1>{item.title}</h1>
                            </div>
                            <div>
                                <p>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )

    return (
        <div className="space-y-3">
            {loading && <div className="text-[#FEEFDD]">Loading...</div>}
            {!loading && filteredTodos.length === 0 && <div className="text-[#FEEFDD]">No todos yet</div>}
            {filteredTodos.map((item, index) => (
                <Card key={index} className="bg-[#45413F] rounded-md px-2 py-3 shadow-xl">
                    <div className="flex flex-col space-y-2">
                        <div className="flex flex-col leading-[1.1]">
                            <div className="flex justify-between">
                                <h1 className="font-bold text-[#FEEFDD]">{item.title}</h1>
                                <div>
                                    <Button onClick={() => handleEdit(item)} size="icon">
                                        <Icon icon="line-md:edit-filled" width="24" height="24" />
                                    </Button>
                                    <Button onClick={() => remove(item.id)} size="icon">
                                        <Icon icon="line-md:trash" width="24" height="24" />
                                    </Button>
                                </div>
                            </div>
                            <p className="text-[#D9CCBD] text-sm">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                                <Icon icon="line-md:calendar" width="16" height="16" className="text-[#D9CCBD]" />
                                <span className="text-[#D9CCBD] text-sm">{dateFormatted(item.dueDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Icon icon="line-md:marker-filled" width="16" height="16" className="text-[#D9CCBD]" />
                                <span className="text-[#D9CCBD] text-sm">{capitalizeFirst(item.category)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <span className={`text-[#D9CCBD] text-sm px-2 rounded shadow ${getStatusColor(item.priority)}`}>
                                    {capitalizeFirst(item.priority)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}

        </div>
    )
}