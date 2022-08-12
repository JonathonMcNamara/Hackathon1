import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService{
  async getAll(query) {
    return await dbContext.Comments.find(query).populate('comment')
  }
  async getCommentsOnPost(postId) {
    let comments = await dbContext.Comments.find({postId}).populate('comment')
    if (!comments) {
      throw new BadRequest ('No comments found')
    }
    return comments
  }

}

export const commentsService = new CommentsService()