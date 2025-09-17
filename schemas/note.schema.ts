import { z } from "zod"

export const initialValue = {
  title: "",
  description: "",
  dueDate: Date, // user will pick
  priority: "",
  category: "",
}

export const noteSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(1, "Please enter a title"),
  description: z
    .string({ error: "Description is required" })
    .min(1, "Please enter your note or task details"),
  dueDate: z.date({ error: "Please select a due date" }),
  priority: z
    .string({ error: "Priority is required" })
    .min(1, "Please select a priority"),
  category: z
    .string({ error: "Category is required" })
    .min(1, "Please select a category"),
})

// 👇 Values your form actually needs
export type NoteFormValue = z.infer<typeof noteSchema>
