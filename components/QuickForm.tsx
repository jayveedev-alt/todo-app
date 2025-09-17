"use client"

import { Controller, useForm } from "react-hook-form";
import Card from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialValue, NoteFormValue, noteSchema } from "@/schemas/note.schema";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DatePicker } from "./ui/date-picker";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

type QuickFormProps = {
    userId: string;
    editing?: any;
    onDone: (updated?: boolean) => void
    show: boolean;
    hasForm: (t: boolean) => void
}

export default function QuickForm({ userId, editing, onDone, show, hasForm }: QuickFormProps) {
    const [saving, setSaving] = useState(false)

    const form = useForm<NoteFormValue>({
        resolver: zodResolver(noteSchema),
        defaultValues: editing ? {
            title: editing.title,
            description: editing.description,
            priority: editing.priority,
            category: editing.category,
            dueDate: editing.dueDate.toDate()
        } : initialValue
    })

    useEffect(() => {
        const edit = (editing: any) => {
            console.log('yes')
            console.log(editing)
            form.reset({
                title: editing.title,
                description: editing.description,
                priority: editing.priority,
                category: editing.category,
                dueDate: editing.dueDate.toDate()
            })
        }
        if (editing) edit(editing);
    }, [editing])

    const onSubmit = async (data: NoteFormValue) => {

        setSaving(true);

        const payload = {
            ...data,
            done: false,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            uid: userId,
        }

        try {
            if (editing) {
                const ref = doc(db, 'todos', editing.id)
                await updateDoc(ref, payload);
                handleClearField()
            } else {
                await addDoc(collection(db, 'todos'), payload)
                handleClearField()
            }
        } catch (err) {
            console.error(err)
            onDone(false)
        }

        setSaving(false);
    }

    const handleClearField = () => {
        hasForm(false);
        onDone(true);
        form.reset({
            title: "",
            description: "",
            priority: "",
            category: ""
        });
    }

    if (!show) {
        return (
            <Card>
                <Button
                    onClick={() => hasForm(true)}
                    className="w-full h-11"
                >
                    {editing ? (
                        <>
                            <Icon icon="line-md:edit-filled" width="24" height="24" />
                            Update Quicklist
                        </>
                    ) : (
                        <>
                            <Icon icon="line-md:plus" width="24" height="24" />
                            Add New Quicklist
                        </>
                    )}
                </Button>
            </Card>
        )
    }

    return (
        <Card className="bg-[#45413F] rounded-md px-2 py-3 shadow-xl">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
            >
                {/* Title */}
                <div className="sm:col-span-3">
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex flex-col space-y-1">
                                <Input
                                    {...field}
                                    placeholder="Task title"
                                    className="text-[#FEEFDD] bg-[#6A645E] w-full"
                                />
                                {form.formState.errors.title && (
                                    <span className="text-[12px] font-poppins text-red-500">
                                        {form.formState.errors.title.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Description */}
                <div className="sm:col-span-3">
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex flex-col space-y-1">
                                <Textarea
                                    {...field}
                                    placeholder="Task details..."
                                    className="text-[#FEEFDD] bg-[#6A645E] w-full resize-none"
                                />
                                {form.formState.errors.description && (
                                    <span className="text-[12px] font-poppins text-red-500">
                                        {form.formState.errors.description.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Due Date */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-[#FEEFDD]">Due Date</label>
                    <Controller
                        name="dueDate"
                        control={form.control}
                        render={({ field }) => (
                            <DatePicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {form.formState.errors.dueDate && (
                        <span className="text-[12px] font-poppins text-red-500">
                            {form.formState.errors.dueDate.message}
                        </span>
                    )}
                </div>

                {/* Priority */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-[#FEEFDD]">Priority</label>
                    <Controller
                        name="priority"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex flex-col space-y-1">
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="text-[#FEEFDD] bg-[#6A645E] w-full">
                                        <SelectValue placeholder="Choose One" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["low", "medium", "high"].map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.priority && (
                                    <span className="text-[12px] font-poppins text-red-500">
                                        {form.formState.errors.priority.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col space-y-1">
                    <label className="text-sm text-[#FEEFDD]">Category</label>
                    <Controller
                        name="category"
                        control={form.control}
                        render={({ field }) => (
                            <div className="flex flex-col space-y-1">
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="text-[#FEEFDD] bg-[#6A645E] w-full">
                                        <SelectValue placeholder="Choose One" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["work", "personal", "shopping", "health", "education"].map(
                                            (option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.category && (
                                    <span className="text-[12px] font-poppins text-red-500">
                                        {form.formState.errors.category.message}
                                    </span>
                                )}
                            </div>
                        )}
                    />
                </div>

                {/* Buttons */}
                <div className="sm:col-span-3 flex justify-end space-x-1 pt-2">
                    <Button
                        size="icon"
                        type="button"
                        onClick={handleClearField}
                        className="border border-[#6A645E] bg-[#6A645E] shadow-xl"
                    >
                        <Icon icon="line-md:close-small" width="24" height="24" />
                    </Button>
                    <Button
                        type="submit"
                        className="border border-[#6A645E] bg-[#6A645E] shadow-xl"
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Saving...
                            </>
                        ) : editing ? (
                            <>
                                <Icon icon="line-md:edit-filled" width="24" height="24" />
                                Update Task
                            </>
                        ) : (
                            <>
                                <Icon icon="line-md:plus" width="24" height="24" />
                                Add New Task
                            </>
                        )}

                    </Button>
                </div>
            </form>
        </Card>
    )
}