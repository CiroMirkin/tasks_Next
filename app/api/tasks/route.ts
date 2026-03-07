
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";
import { taskSchema } from "../schemas/taskSchema";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if(isNaN(take)) {
        return NextResponse.json(
            { message: 'Take debe ser un numero.', },
            { status: 400, },
        )
    }

    if(isNaN(skip)) {
        return NextResponse.json(
            { message: 'Skip debe ser un numero.', },
            { status: 400, },
        )
    }

    const tasks = await prisma.task.findMany({
        take: take,
        skip: skip,
    })
    
    return NextResponse.json({
        tasks,
    })
}

export async function POST(request: Request) {
    try {
        const { 
            description, 
            complete,
        } = await taskSchema.validate(await request.json())
        const task = await prisma.task.create({ 
            data: {
                description, 
                complete
            },
        })
        return NextResponse.json(task)
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