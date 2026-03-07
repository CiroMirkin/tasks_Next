import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { Task } from "@/app/generated/prisma/client";
import { taskSchema } from "../../schemas/taskSchema";
import { ValidationError } from "yup";
import { ApiResponse } from "@/app/api/apiResponse";

interface Segments {
    params: Promise<{ id: string }>
}

interface TaskResponse extends ApiResponse {
    task: Task | null
}

const getTaskById = async ({ id }: { id: string}): Promise<TaskResponse>  => {
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

export async function PUT(request: Request, { params }: Segments) {
    try {
        const { id } = await params
        const { task, message, status } = await getTaskById({ id })

        if(!task) {
            return NextResponse.json({ message, status })
        }

        const { 
            description, 
            complete,
        } = await taskSchema.validate(await request.json())

        const updatedTask = await prisma.task.update({
            where: { id },
            data: { description, complete }
        })

        return NextResponse.json(updatedTask)
    }
    catch (e) {
        if (e instanceof ValidationError) {
            return NextResponse.json(
                { message: e.errors, },
                { status: 400, }
            )
        }
        return NextResponse.json({ status: 500, })   
    }
}