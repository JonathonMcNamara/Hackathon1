import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { postsService } from "./PostsService.js"

class CommentsService {
  async deleteComment(commentId, userId) {
    let comment = await this.getCommentById(commentId)
    if (comment.creatorId.toString() !== userId) {
      throw new BadRequest('Invalid Comment')
    }
    return comment
  }
  
  async getCommentById(commentId) {
    let comment = await dbContext.Comments.findById(commentId)
    if (!comment) {
      throw new BadRequest ('invalid comment id')
    }
    return comment
  }

  async getAll(query) {
    return await dbContext.Comments.find(query).populate('creator')
  }

  async createComment(commentData) {
    let post = await dbContext.Posts.findById(commentData.postId)
    if (!post) {
      throw new BadRequest('Cannot find post')
    }
    await postsService.getPostById(commentData.postId)
    let postComment = await dbContext.Comments.create(commentData)
    await postComment.populate('creator')
    return postComment
  }

  async getCommentsOnPost(postId) {
    let postComments = await dbContext.Comments.find({ postId })
      .populate('post')
    return postComments
  }
  

}



export const commentsService = new CommentsService()