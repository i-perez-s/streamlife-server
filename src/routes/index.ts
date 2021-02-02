import express from 'express'
<<<<<<< HEAD
export const app: express.Application = express()
import {router as authRouter} from "./auth"

app.use(authRouter)
=======
export const app = express()

import authRouter from './auth'

app.use(authRouter)
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
