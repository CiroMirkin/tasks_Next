export const dynamic = 'force-dynamic'
export const revalidate = 0

import { prisma } from "@/app/lib/prisma"
import { TaskList } from "./components/TaskList"
import { CreateTask } from "./components/CreateTask"
import { DeleteCompletedTasks } from "./components/DeleteCompletedTasks"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {

  const session = await getServerSession(authOptions)
  if(!session) {
    redirect('/api/auth/signin')
  }

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
