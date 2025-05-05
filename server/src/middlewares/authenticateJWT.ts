import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.accessToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
      return;
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
  }
  res.status(401).json({ message: "Token not found" });
  return;
};
