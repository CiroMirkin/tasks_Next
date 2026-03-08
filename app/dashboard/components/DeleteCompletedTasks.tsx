"use client"

import { Button } from "@/components/ui/button";
import * as tasksApi from "@/app/dashboard/api/tasks"
import { useRouter } from "next/navigation";

export function DeleteCompletedTasks() {
    const router = useRouter()
    const handleDeleteCompleteTasks = async () => {
        const deletedTasks = await tasksApi.deleteCompletedTasks()
        router.refresh()
        if(deletedTasks) {
            console.info("Tareas eliminadas exitosamente")
        }
    }

    return (
        <Button variant="destructive" onClick={handleDeleteCompleteTasks}>
            Delete completed tasks
        </Button>
    )
}