import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import connectDB from './config/db'

const app = express()
dotenv.config()
connectDB()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api', userRoutes)

app.get('/' , (req, res) => {
    res.send('Hello')
})

app.listen(port , () => {
    console.log(`Listenin to port ${port}`)
})