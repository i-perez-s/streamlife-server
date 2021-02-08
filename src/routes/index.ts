import express from 'express'
export const app = express()

import authRouter from './login'
import userRouter from './user'
import followRouter from './follow'

app.use(authRouter)
app.use(userRouter)
app.use(followRouter)
