import express from"express"
import { MusicController } from "../controller/music-controller"
export const apiRouter = express.Router()
apiRouter.post("/api/music",MusicController.createMusic)
apiRouter.get("api/music",MusicController.getAllMusic)
apiRouter.put("api/music",MusicController.updateMusic)
apiRouter.delete("api/music",MusicController.deleteMusic)