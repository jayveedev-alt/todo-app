"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Icon } from "@iconify/react";
import Card from "./ui/card";

interface FilterFormProps {
    onFilterChange: (filters: {
        search: string;
        category: string;
        priority: string;
        status: string;
    }) => void;
}

export default function FilterForm({ onFilterChange }: FilterFormProps) {
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        priority: "all",
        status: "all",
    });

    const updateFilter = (key: keyof typeof filters, value: string) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters); // 🔥 notify parent (Todo list)
    };

    const clearFilters = () => {
        const reset = { search: "", category: "all", priority: "all", status: "all" };
        setFilters(reset);
        onFilterChange(reset);
    };

    return (
        <Card className="bg-[#45413F] rounded-md px-2 py-3 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                {/* Left side: search */}
                <div className="lg:col-span-2 flex flex-col space-y-1">
                    <div className="flex items-center space-x-1">
                        <Icon icon="line-md:search" width="24" height="24" className="text-[#FEEFDD] scale-x-[-1]" />
                        <Input
                            placeholder="Search tasks..."
                            value={filters.search}
                            onChange={(e) => updateFilter("search", e.target.value)}
                            className="text-[#FEEFDD] bg-[#6A645E] w-full"
                        />
                    </div>
                    <span className="flex items-center space-x-1 text-sm text-[#FEEFDD]">
                        <Icon icon="line-md:filter" width="16" height="16" />
                        Filtered by {filters.category}, {filters.priority}, {filters.status}
                    </span>
                </div>

                {/* Right side: dropdowns */}
                <div className="flex flex-col space-y-1">
                    <div className="flex space-x-2">
                        {/* Category */}
                        <Select value={filters.category} onValueChange={(v) => updateFilter("category", v)}>
                            <SelectTrigger className="text-[#FEEFDD] bg-[#6A645E] w-full">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="personal">Personal</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Priority */}
                        <Select value={filters.priority} onValueChange={(v) => updateFilter("priority", v)}>
                            <SelectTrigger className="text-[#FEEFDD] bg-[#6A645E] w-full">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Status */}
                        <Select value={filters.status} onValueChange={(v) => updateFilter("status", v)}>
                            <SelectTrigger className="text-[#FEEFDD] bg-[#6A645E] w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="complete">Complete</SelectItem>
                                <SelectItem value="archieve">Archive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Clear filters */}
                    <button
                        type="button"
                        onClick={clearFilters}
                        className="text-right text-[#FEEFDD] text-sm hover:underline cursor-pointer"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>
        </Card>
    );
}
