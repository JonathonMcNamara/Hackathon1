import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";

export class CommentsController extends BaseController{
    constructor(){
        super('/api/comments')
        this.router
        .get('', this.getAll)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
    }

    async getAll(req, res, next) {
      try {
        const query = req.query
        const comments = await commentsService.getAll(query)
        res.send(comments)
      } catch (error) {
        next(error)
      }
    }

    async createComment(req,res,next) {
        try {
        let commentData = req.body
        commentData.creatorId = req.userInfo.id
        let postComment = await commentsService.createComment(commentData)
        res.send(postComment) 
        } catch (error) {
        next(error)    
        }
  }
  
    async deleteComment(req, res, next) {
    try {
      const commentId = req.params.id
      const userId = req.userInfo.id
      await commentsService.deleteComment(commentId, userId)
      return res.send(' deleted')
    } catch (error) {
      next(error)
    }
  }
}