import { object, string, boolean } from "yup";

export const createTaskSchema = object({
    description: string().required().max(300).min(2),
    complete: boolean().optional().default(false),
});

export const updateTaskSchema = object({
    description: string().optional().max(300).min(2),
    complete: boolean().optional().default(false),
});

