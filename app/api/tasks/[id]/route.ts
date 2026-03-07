import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { Task } from "@/app/generated/prisma/client";

interface Segments {
    params: Promise<{ id: string }>
}

const getTaskById = async ({ id }: { id: string}): Promise<{ message: string, status: number, task: Task | null }> => {
    const task = await prisma.task.findUnique({
        where: {
            id,
        }
    })
    if(!task) {
        return { 
            task: null,
            message: 'Tarea no encontrada.', 
            status: 404, 
        }
    }
    return { 
        task,
        message: 'Tarea encontrada.', 
        status: 200, 
    }
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = await params
    const { task, message, status } = await getTaskById({ id })
    
    if(!task) {
        return NextResponse.json({ message, status })
    }
    return NextResponse.json(task)
}