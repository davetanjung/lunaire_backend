import{Music, Prisma} from "@prisma/client"
export interface music{
    id:number
    file_path:string
    sound_name:string
}
export function MusicResponseList(prismaMusic:Music[]):Music[]{
const result = prismaMusic.map((music)=>{
    return{
        id:music.id,
        sound_name:music.sound_name,
        file_path:music.file_path
    }
})
return result
}
export function MusicResponse(prismaMusic:Music):Music{
    return{
        id:prismaMusic.id,
        sound_name:prismaMusic.sound_name,
        file_path:prismaMusic.file_path
    }
}
export interface MusicCreateRequest {
    id:number
    sound_name: string
    file_path: string
}

export interface MusicUpdateRequest {
    id: number
    sound_name: string
    file_path: string
}