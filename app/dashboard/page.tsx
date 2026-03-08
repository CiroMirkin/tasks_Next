import { prisma } from "@/app/lib/prisma"
import { TaskList } from "./components/TaskList"
import { CreateTask } from "./components/CreateTask"
import { DeleteCompletedTasks } from "./components/DeleteCompletedTasks"

export default async function Dashboard() {

  const tasks = await prisma.task.findMany({
    orderBy: {
      description: 'asc',
    },
  })

  return (
    <main>
      <CreateTask />
      <DeleteCompletedTasks />
      <TaskList tasks={tasks} />
    </main>
  )
}
