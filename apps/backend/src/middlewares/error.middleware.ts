import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { ZodError } from "zod";
import { Prisma } from "@repo/db";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    // TODO: Remove this log in productions 
    console.error("Error",err);


    /* -------------------- ZOD -------------------- */
    if(err instanceof ZodError){
        return res.status(400).json({
            success: false,
            message:"Validation Error",
            errors: err.issues.map( e =>({
                feild: e.path.join("."),
                message: e.message
            }))
        })
    }

    /* -------------------- APP ERRORS -------------------- */
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success:false,
            message: err.message,
        })
    }
    
    /* -------------------- PRISMA -------------------- */
    if( err instanceof Prisma.PrismaClientKnownRequestError){
        if( err.code == "P2002"){
            return res.status(409).json({
                success:false,
                message:"User Already Exists",
                feilds: err.meta?.target
            }) 
        }
         return res.status(400).json({
            success: false,
            message: "Database error",
            code: err.code,
            });
    }

    /* -------------------- FALLBACK -------------------- */
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });







}