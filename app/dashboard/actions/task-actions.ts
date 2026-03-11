"use server"

import { prisma } from "@/app/lib/prisma"
import { getUserServerSession } from "@/auth/actions/auth-actions"
import { revalidatePath } from "next/cache"
import { ValidationError } from "yup"

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

export const createTask = async (newTask: { description: string, complete?: boolean }) => {
    try {
        const user = await getUserServerSession()
        const task = await prisma.task.create({ data: {...newTask, userId: user!.id}, })
        revalidatePath('/dashboard')
        return task
    }
    catch (e) {
        if (e instanceof ValidationError) {
            return { message: e.errors }
            
        }
        return e
    }
}

export const deleteCompletedTasks = async () => {
    const user = await getUserServerSession()
    const deletedTasks = await prisma.task.deleteMany({
        where: {
            complete: true,
            userId: user!.id,
        }
    })

    if(!deletedTasks) {
        throw "No se encontraron tareas completadas."
    }

    revalidatePath('/dashboard')
}
