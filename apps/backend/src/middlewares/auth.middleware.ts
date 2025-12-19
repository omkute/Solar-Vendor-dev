import { NextFunction, Request, Response } from "express";
import { JwtPayload, verifyAccessToken } from "../utils/jwt";
import { AppError } from "../utils/app-error";


export interface AuthenticatedUsers extends Request {
    user?: JwtPayload
}

export const Authenticate = (
    req: AuthenticatedUsers,
    _res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(new AppError("Authentication Required", 401));
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(new AppError("Authentication Required", 401));
    }


    try {
        const payload = verifyAccessToken(token)
        req.user = payload
        return next()
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }
}