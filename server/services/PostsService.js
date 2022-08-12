import { dbContext } from "../db/DbContext.js"

class PostsService{
    async getAll(query = {}){
    return await dbContext.Posts.find(query).populate('postInfo')
    } 
}



export const postsService = new PostsService()