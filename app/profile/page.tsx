"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export default function Profile() {
    const { data: session, status } = useSession()

    if(status === 'unauthenticated') {
        return
    }

    const image = session?.user?.image || ''
    const name = session?.user?.name || 'No Name'
    const email = session?.user?.email || ''
    const roles = session?.user?.roles || ''
    
    return (
        <main className="w-full px-6 py-4">
            <header className="w-full grid place-items-center gap-4 p-6 rounded text-center bg-slate-100">
                <Avatar className="w-50 h-50">
                    <AvatarImage src={image} alt={name} />
                </Avatar>
                <div>
                    <h1 className="text-3xl font-semibold capitalize">{name}</h1>
                    <p className="text-base opacity-70">{email}</p>
                    <p>{roles && roles.join(' - ')}</p>
                </div>
            </header>
        </main>
    )
}