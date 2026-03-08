import { Task } from "@/app/generated/prisma/client";

export const updateTask = async (id: string, complete: boolean): Promise<Task> => {
    const body = { complete }
    const task = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return task
}

export const createTask = async (description: string): Promise<Task> => {
    const body = { description }
    const task = await fetch(`/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    return task
}
