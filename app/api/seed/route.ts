import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    
    await prisma.task.deleteMany() // delete * from Task

    await prisma.task.createMany({
        data: [
            { description: "As long as I can remember, I always wanted to be a gangster." },
            { description: "I'm funny how? I mean funny like I'm a clown? I amuse you?" },
            { description: "The wolf on Wall Street would not have been caught if he had kept his mouth shut." },
            { description: "You don't make up for your sins in church. You do it in the streets. You do it at home. The rest is bullshit and you know it." },
            { description: "I don't trust people who don't love themselves and tell me, 'I love you.' There is an African saying: Be careful when a naked person offers you a shirt." },
            { description: "The time is yours. Do what you want with it." },
            { description: "You're only as good as your last envelope." },
            { description: "I'm not gonna die in here. I'm gonna walk out of here." },
            { description: "You think I'm stupid? I'm smarter than you think." },
            { description: "You can't be afraid to take a big step. You can't be afraid to fall." },
            { description: "I always tell the truth. Even when I lie." },
            { description: "You're gonna need a bigger boat.", complete: true },
            { description: "The only thing standing between you and your goal is the story you keep telling yourself as to why you can't achieve it.", complete: true },
            { description: "You either die a hero, or you live long enough to see yourself become the villain.", complete: true },
            { description: "I'm not bad. I'm just drawn that way.", complete: true },
            { description: "I'm not gonna die in here. I'm gonna walk out of here.", complete: true }
        ]
    })

    return NextResponse.json({
        message: "seed executed"
    })
}