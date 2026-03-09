"use client"

import { Task } from "@/app/generated/prisma/client"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { startTransition, useOptimistic } from "react"
import { toggleTask } from "../actions/task-actions"

interface Props {
    task: Task
}

export function TaskItem({ task }: Props) {
    const [ taskOptimistic, toggleTaskOptimistic ] = useOptimistic(
        task, 
        (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue})
    )

    const handleToggleTask = async() => {
        try {
            startTransition(() => toggleTaskOptimistic(!taskOptimistic.complete))
            await toggleTask(taskOptimistic.id, !taskOptimistic.complete)
        }
        catch (e) {
            startTransition(() => toggleTaskOptimistic(!taskOptimistic.complete))
        }
    }

    return (
        <li 
            onClick={handleToggleTask}
            className={cn(
                "border border-zinc-900 p-2 pr-2.5 text-balance cursor-default",
                "hover:bg-amber-200",
                "flex gap-1",
                taskOptimistic.complete ? "bg-green-200 line-through" : "bg-zinc-200"
            )}
        >
            {taskOptimistic.complete && <Check />}
            {taskOptimistic.description}
        </li>
    )
}