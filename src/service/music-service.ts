import { Music } from "@prisma/client";
import { MusicCreateRequest,MusicResponse,MusicResponseList,MusicUpdateRequest } from "../model/music-model";
import{prismaClient} from"../application/database"
import{logger} from"../application/logging"
import { ResponseError } from "../error/response-error";
export class MusicService{
    static async getAllMusic(music:Music):Promise<Music[]>{
        const Music = await prismaClient.music.findMany({
            where:{
                 id:music.id
            }
        })
        return  MusicResponseList(Music)
    }
    static async getMusic(music:Music,id:number):Promise<Music>{
        const Music = await this.checkMusicIsEmpty(music.id)
        return MusicResponse(Music)
    }
    static async createMusic(music:Music):Promise<string>{
        const Music = await prismaClient.music.create({
            data:{
                id:music.id,
                sound_name:music.sound_name,
                file_path:music.file_path
            }
        })
        return "data created successfully"
    }
    static async checkMusicIsEmpty(id:number):Promise<Music>{
        const music = await prismaClient.music.findUnique({
            where:{
                id:id
            }
        })
        if(!music){
            throw new ResponseError(400,"not found")
        }
        return music
    }
    static async updateMusic(music:Music,req:MusicUpdateRequest):Promise<string>{
        await this.checkMusicIsEmpty(music.id)
        const MusicUpdate = await prismaClient.music.update({
            where:{
                id: music.id
            },
            data:music
        })
        return "data successfully updated"
    }
    static async deleteMusic(music:Music):Promise<string>{
        await this.checkMusicIsEmpty(music.id)
        await prismaClient.music.delete({
            where:{
                id:music.id
            }
        })
        return "data has been deleted successfully"
    }
}