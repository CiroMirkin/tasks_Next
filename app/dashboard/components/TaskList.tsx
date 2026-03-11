import { prisma } from "@/app/lib/prisma"
import { TaskItem } from "./TaskItem"
import { getUserServerSession } from "@/auth/actions/auth-actions"

export async function TaskList() {
    const user = await getUserServerSession()
    const tasks = await prisma.task.findMany({
        where: { userId: user!.id },
        orderBy: {
          description: 'asc',
        },
    })
    
    return (
        <ul className="flex gap-4 flex-wrap">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id}
                    task={task}
                />
            ))} 
        </ul>
    )
}