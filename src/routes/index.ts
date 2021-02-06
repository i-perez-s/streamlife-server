import express from 'express'
export const app = express()

import authRouter from './auth'

app.use(authRouter)
