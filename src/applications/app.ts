import express from "express"
import router, { sleepNoteRouter } from "../routes/authRouter"

const app = express()
app.use(express.json())
app.use(router)
app.use(sleepNoteRouter);


export default app

