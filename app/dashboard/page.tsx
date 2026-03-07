import { prisma } from "@/app/lib/prisma"
import { TaskList } from "./components/TaskList"

export default async function Dashboard() {

  const tasks = await prisma.task.findMany({
    orderBy: {
      description: 'asc',
    },
  })

  return (
    <>
      <TaskList tasks={tasks} />
    </>
  )
}
