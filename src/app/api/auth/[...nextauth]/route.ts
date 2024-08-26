import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { singInEmailPassword } from "@/app/auth/actions/auth-actions";

prisma

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
      }),

      GithubProvider({
        clientId: process.env.AUTH_GITHUB_ID ?? '',
        clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
      }),

      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Correo electronico", type: "email", placeholder: "correo@goole.com" },
          password: { label: "Contraseña", type: "password", placeholder: "******"}
        },
        async authorize(credentials, req) {
          
          const user = await singInEmailPassword(credentials!.email, credentials!.password)
    
          if (user) {
            return user
          } 
          
          return null

        }
      })
    ],
    secret: process.env.NEXTAUTH_SECRET, // Aquí añades la secret

    session: {
      strategy: 'jwt'
    },

    callbacks: {
      async signIn({user,account,profile,email,credentials}){
        // console.log({user});
        return true
      },
      async jwt({token, user, account, profile}){
        // console.log({token});
        const dbUser = await prisma.user.findUnique({where:{email: token.email ?? 'no-email'}})

        if(dbUser?.isActive === false){
          throw Error('Usuario no esta activo')
        }

        token.roles = dbUser?.roles ?? ['no-roles']
        token.id = dbUser?.id ?? 'no-uuid'
        return token
      },
      async session({session,token,user}){
        // console.log({token})

        if(session && session.user){
          session.user.roles = token.roles
          session.user.id = token.id
        }
        return session
      }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

