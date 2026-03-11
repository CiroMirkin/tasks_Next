"use client"

import { LogOut, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Spinner } from "./ui/spinner";

export default function LogoutAndSignInButton() {
    const { status } = useSession()

    if(status === 'loading') {
        return (
            <Button disabled><Spinner/> Loading...</Button>
        )
    }

    if(status === 'unauthenticated') {
        return (
            <Button onClick={() => signIn()}><LogIn/> Sign In</Button>
        )
    }

    return (
        <Button onClick={() => signOut()}><LogOut/> Log Out</Button>
    )
}