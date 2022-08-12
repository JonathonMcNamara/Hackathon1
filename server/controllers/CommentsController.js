import { commentsService } from "../services/CommentsService.js";
import BaseController from "../utils/BaseController.js"



export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments');
    this.router
      .get('', this.getAll)

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

}