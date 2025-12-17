import { type Response, type NextFunction } from "express";
import { type AuthRequest } from "./authMiddleware.js";

export const authorizeRoles =
  (...allowedRoles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized - No user found" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden - You do not have permission to access this route",
      });
      return;
    }

    next();
  };