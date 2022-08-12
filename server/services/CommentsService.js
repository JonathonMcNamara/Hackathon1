import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { postsService } from "./PostsService.js"

class CommentsService{

  async getAll(query) {
    return await dbContext.Comments.find(query).populate('comment')
  }

    async createComment(commentData){
        let post = await dbContext.Posts.findById(commentData.postId)
        if(!post){
            throw new BadRequest('Cannot find post')
        }
        await postsService.getPostById(commentData.postId)
        let postComment = await dbContext.Comments.create(commentData)
        return postComment
    }

    async getCommentsOnPost(postId){
        let postComments = await dbContext.Comments.find({ postId })
        .populate('post')
        return postComments
    }
}



export const commentsService = new CommentsService()