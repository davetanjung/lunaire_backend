import express from "express"
import router from "../routes/authRouter"

const app = express()
app.use(express.json())
app.use(router)

