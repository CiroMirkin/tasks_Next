"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache"

export const toggleTask = async (id: string, complete: boolean) => {
    const task = await prisma.task.findFirst({ where: { id }})

    if(!task) {
        throw `Tarea "${id}" no encontrado`
    }

    const updatedTask = await prisma.task.update({
        where: { id },
        data: { complete },
    })

    revalidatePath('/dashboard')
    return updatedTask
}
