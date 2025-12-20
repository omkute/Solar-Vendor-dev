import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { prisma } from "@repo/db";


export const requireApproval = async (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (!req.user) {
        return next(new AppError("Unauthorized", 401))
    }
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: { isApproved: true },
    });
    if(!user || !user.isApproved){
        return next(new AppError("Account not Approved", 401))
    }
    next()
}