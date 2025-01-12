import{NextFunction,Response} from"express"
import { MusicService } from "../service/music-service"
import { MusicCreateRequest,MusicUpdateRequest } from "../model/music-model"
export class MusicController{
    static async getAllMusic(
        req:MusicCreateRequest,
        res:Response,
        next:NextFunction
    ){
        try{
            const response = await MusicService.getAllMusic(req)
            res.status(200).json({
                data:response,
            })
        }catch(error){
                next(error)
            }
        }
        static async getMusic(req:MusicCreateRequest,res:Response,next:NextFunction){
            try{
                const response =await MusicService.getMusic(
                    req,Number(req.id)
                )
                res.status(200).json({
                    data:response
                })
            }
            catch(error){
                next(error)
            }
        }
        static async createMusic(req:MusicCreateRequest,res:Response,next:NextFunction){
            try{
                const response = await MusicService.createMusic(req)
                res.status(200).json({
                    data:response
                })
            } catch(error){
                next(error)
            }
        }
        static async updateMusic(req:MusicCreateRequest,res:Response,next:NextFunction){
            try{
                const request = req as MusicUpdateRequest
                req.id = Number(req.id)
                const response = await MusicService.updateMusic(req,request)
                res.status(200).json({
                    data:response
                })
            } catch(error){
                next(error)
            }
        }
        static async deleteMusic(req:MusicCreateRequest,res:Response,next:NextFunction){
            try{
                const response = await MusicService.deleteMusic(req)
                res.status(200).json({
                    data:response
                })
            }catch(error){
                next(error)
            }
        }
    }