import express from 'express'
import * as dotenv from 'dotenv'
import deviceRoutes from './routes/deviceRoutes'
import  cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())

const PORT:number =  parseInt(process.env.PORT || '3001', 10)
app.use(cors());
app.use('/api/devices', deviceRoutes)

app.get('/ping', (_req, res) => {
  console.log('someone pinged here')
  res.send('pong')
})


if (process.env.NODE_ENV !== 'test') {
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
}


export default app