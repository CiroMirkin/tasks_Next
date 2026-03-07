"use client"

import { Task } from "@/app/generated/prisma/client"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Props {
    task: Task
    toggleTask: (id: string, complete: boolean) => Promise<Task|void>
}

export function TaskItem({ task, toggleTask }: Props) {
    return (
        <li 
            onClick={() => toggleTask(task.id, !task.complete)}
            className={cn(
                "border border-zinc-900 p-2 pr-2.5 text-balance cursor-default",
                "hover:bg-amber-200",
                "flex gap-1",
                task.complete ? "bg-green-200 line-through" : "bg-zinc-200"
            )}
        >
            {task.complete && <Check />}
            {task.description}
        </li>
    )
}