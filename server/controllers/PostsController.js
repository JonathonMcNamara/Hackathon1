import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";
// import { commentsService } from "../services/CommentsService.js";

export class PostsController extends BaseController {
  constructor() {
    super("/api/posts");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getPostById)
<<<<<<< HEAD
      // .get("/:id/comments", this.getCommentsOnPost)
=======

      // .get("/:id/comments",this.getCommentsOnPost)

>>>>>>> 9ef3d669dc48e4bf4f156f1e7e664a8cfaf6848e
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPost)
      .delete('/:id', this.deletePost)
  }


  async getAll(req, res, next) {
    try {
      const query = req.query;
      const posts = await postsService.getAll(query);
      return res.send(posts);
    } catch (error) {
      next(error);
    }
  }
  async createPost(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.createPost(req.body);
      res.send(post)
    } catch (error) {
      next(error);
    }
  }

  // async getCommentsOnPost(req,res,next) {
  //   try {
  //   let comments = await commentsService.getCommentsOnPost(req.params.id)
  //   res.send(comments)  
  //   } catch (error) {
  //   next(error)  
  //   }
  // }

  async getPostById(req, res, next) {
    try {
      const post = await postsService.getPostById(req.params.id)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req, res, next) {
    try {
      const postId = req.params.id
      const userId = req.userInfo.id
      await postsService.deletePost(postId, userId)
      return res.send('Post deleted')
    } catch (error) {
      next(error)
    }
  }


}
