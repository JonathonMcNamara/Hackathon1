import { dbContext } from "../db/DbContext.js"

class PostsService{
    
    async createPost(body) {
    let post = await dbContext.Posts.create(body)
    await post.populate('creatorId')
    return post
    }


    async getAll(query = {}){
    return await dbContext.Posts.find(query).populate('postInfo')
    } 
}



export const postsService = new PostsService()