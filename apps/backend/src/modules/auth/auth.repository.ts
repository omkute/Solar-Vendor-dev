import { prisma } from "@repo/db";

export interface AuthUser{
    email: string;
    username: string;
    password: string;
    role: "admin" | "sales" | "manager"
}

export class AuthRepository{
    async findByEmail(email : string){
        return prisma.user.findUnique({
            where: { email}
        })
    }
    async createUser(data :AuthUser){
        return prisma.user.create({
            data:{
                email: data.email,
                username: data.username,
                password: data.password,
                ...(data.role && { role:data.role}),
            },
        })
    }
    
}   