import express from 'express'
export const app = express()

import authRouter from './login'
import userRouter  from './user'

app.use(authRouter)
app.use(userRouter)
