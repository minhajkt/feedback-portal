import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret-key'

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization']

    if(authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(' ')[1]

        try {
            const decoded = jwt.verify(token, JWT_SECRET)
            req.user = decoded
            next()
        } catch (error) {
            res.status(403).json({message :"Invalid or expired token"})
        }
    }else {
        res.status(401).json({message :"Token not found"})
    }
}