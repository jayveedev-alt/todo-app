import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateFormatted(date: any) {
  const dueDate = date?.toDate();
  const formatted = dueDate ? format(dueDate, "MMMM d, yyyy") : "";
  return formatted;
}

export function capitalizeFirst(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getStatusColor(str: string): string {
  let className = "bg-yellow-500"
  if (str === "medium") {
    className = "bg-orange-500";
  } else if (str === "high") {
    className = "bg-red-900";
  }

  return className;
}