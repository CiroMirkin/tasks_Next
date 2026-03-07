import { object, string, boolean } from "yup";

export const taskSchema = object({
    description: string().required().max(300).min(2),
    complete: boolean().optional().default(false),
});
