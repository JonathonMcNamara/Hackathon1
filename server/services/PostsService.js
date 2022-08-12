import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class PostsService{
    async getAll(query = {}){
        return await dbContext.Posts.find(query).populate('postInfo')
        } 
    
    async getPostById(id) {
        const post = await dbContext.Posts.findById(id).populate('creatorInfo')
        if (!post){
            throw new BadRequest('Invalid post')
        }
        return post
    }
    
    async createPost(body) {
        let post = await dbContext.Posts.create(body)
        await post.populate('creatorId')
        return post
    }


   
}



export const postsService = new PostsService()