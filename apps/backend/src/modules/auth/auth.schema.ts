import z from "zod";

export const loginSchema = z.object({
    email : z.email({
      message: 'Enter a valid email',
    }),


    password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password too long"),
    role : z.string().optional()
})

export const signupSchema = z.object({
    email : z.email({
      message: 'Enter a valid email',
    }),

    username: z.string().min(2, { message: "Username must be at least 2 characters long" })
    .max(16, { message: "Username cannot exceed 16 characters" }).toLowerCase().trim(),

    password: z.string().min(8, "Password must be at least 8 characters long").max(128, "Password too long")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[\W_]/, "Must contain a special character"),

    role : z.string().optional()
})

export type loginValidation = z.infer<typeof loginSchema>
export type signUpValidation = z.infer<typeof signupSchema>
