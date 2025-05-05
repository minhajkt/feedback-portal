import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || "secret-key"

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET)
}

