import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE() {
    const deletedTasks = await prisma.task.deleteMany({
        where: {
            complete: true
        }
    })

    if(!deletedTasks) {
        return NextResponse.json({
            message: "No se encontraron tareas completadas.",
            status: 404,
        })
    }

    return NextResponse.json({
        message: "Las tareas completadas se eliminaron exitosamente.",
        status: 200,
        deletedTasks,
    })
}
