import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SearchForm } from "@/components/search-form"

export default async function User() {
    const session = await getServerSession(authOptions)

    if(!session) {
        return (
            <span className="font-medium py-2 px-2">Tasks</span>
        )
    }

    const name = session.user?.name || 'No Name'
    const image = session.user?.image || ''
    const email = session.user?.email || ''
        
    return (
        <>
            <div className="flex gap-2 items-center py-2 px-2">
                <Avatar>
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback>{name.toLocaleUpperCase().at(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs opacity-60">{email}</span>
                </div>
            </div>
            <SearchForm />
        </>
    )
}