import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
    params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Segments) {
    const { id } = await params

    const task = await prisma.task.findUnique({
        where: {
            id,
        }
    })

    if(!task) {
        return NextResponse.json(
            { message: 'Tarea no encontrada.', },
            { status: 404, },
        )
    }

    return NextResponse.json(task)
}