import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
export class CommentsController extends BaseController{
    constructor(){
        super('/api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
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
}