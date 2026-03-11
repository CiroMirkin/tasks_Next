export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  return (
    <main>
      <CreateTask />
      <DeleteCompletedTasks />
      <TaskList />
    </main>
  )
}
