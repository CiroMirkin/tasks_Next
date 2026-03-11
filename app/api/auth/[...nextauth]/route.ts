import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma"
import { signInEmailPassword } from "@/auth/actions/auth-actions"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Correo Electrónico',
                    type: 'email',
                    placeholder: 'youremail@some.com',
                },
                password: {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: '*****',
                },
            },
            async authorize(credentials) {
                const user = await signInEmailPassword(credentials!.email, credentials!.password)
                return user ? user : null
            },
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
