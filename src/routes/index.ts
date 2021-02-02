import express from 'express'
<<<<<<< HEAD
<<<<<<< HEAD
export const app: express.Application = express()
import {router as authRouter} from "./auth"

app.use(authRouter)
=======
=======
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
export const app = express()

import authRouter from './auth'

app.use(authRouter)
<<<<<<< HEAD
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
=======
>>>>>>> 1815d7c48536d3d4b12349d8cea4433dca80552a
