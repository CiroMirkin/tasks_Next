import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async signIn() {
            return true
        },
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({ 
                where: { email: token.email ?? 'no-email' }
            })
            
            if(dbUser?.isActive === false) {
                throw Error('Usuario Restringido')
            }

            token.roles = dbUser?.roles ?? ['no-roles']
            token.id = dbUser?.id ?? 'no-id'
            return token
        },
        async session({ session, token }) {
            if(session && session.user){
                session.user.roles = token.roles
                session.user.id = token.id
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
