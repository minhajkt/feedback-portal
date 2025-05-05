import { NextFunction, Request, Response } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user

    if(!user || user.role !== 'admin') {
         res.status(403).json({message: "Only admin can have access"})
         return;
    }
    next()
}