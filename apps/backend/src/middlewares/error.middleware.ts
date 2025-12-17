import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=>{
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success:false,
            message: "Internal Server Error",
        })
    }
}