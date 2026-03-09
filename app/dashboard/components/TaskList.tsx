"use client"

import { Task } from "@/app/generated/prisma/client"
import { TaskItem } from "./TaskItem"
import { toggleTask } from "../actions/task-actions"

interface Props {
    tasks?: Task[]
}

export function TaskList({ tasks = [] }: Props) {
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