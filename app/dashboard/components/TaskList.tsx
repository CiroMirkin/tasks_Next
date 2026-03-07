"use client"

import { Task } from "@/app/generated/prisma/client"
import { TaskItem } from "./TaskItem"
import * as tasksApi from '../api/tasks'
import { useRouter } from "next/navigation"

interface Props {
    tasks?: Task[]
}

export function TaskList({ tasks = [] }: Props) {
    const router = useRouter()
    
    const toggleTask = async (id: string, complete: boolean) => {
        const updateTaskState = await tasksApi.updateTask(id, complete)
        router.refresh()
        return updateTaskState
    }

    return (
        <ul className="flex gap-4 flex-wrap">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                    toggleTask={toggleTask}
                />
            ))} 
        </ul>
    )
}