import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import feedbackRoutes from './routes/feedbackRoutes'
import connectDB from './config/db'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()
dotenv.config()
connectDB()
const port = process.env.PORT || 3000
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api', userRoutes)
app.use('/api', feedbackRoutes)
app.get('/' , (req, res) => {
    res.send('Hello')
})

app.listen(port , () => {
    console.log(`Listenin to port ${port}`)
})