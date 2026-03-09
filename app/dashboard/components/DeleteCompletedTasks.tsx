"use client"

import { Button } from "@/components/ui/button";
import { deleteCompletedTasks } from "../actions/task-actions";

export function DeleteCompletedTasks() {
    const handleDeleteCompleteTasks = async () => {
        deleteCompletedTasks()
        console.info("Tareas eliminadas exitosamente")
    }

    return (
        <Button variant="destructive" onClick={handleDeleteCompleteTasks}>
            Delete completed tasks
        </Button>
    )
}