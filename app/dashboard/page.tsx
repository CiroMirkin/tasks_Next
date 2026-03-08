import { prisma } from "@/app/lib/prisma"
import { TaskList } from "./components/TaskList"
import { CreateTask } from "./components/CreateTask"

export default async function Dashboard() {

  const tasks = await prisma.task.findMany({
    orderBy: {
      description: 'asc',
    },
  })

  return (
    <main>
      <CreateTask />
      <TaskList tasks={tasks} />
    </main>
  )
}
