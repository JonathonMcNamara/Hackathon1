import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";
import { commentsService } from "../services/CommentsService.js";

export class PostsController extends BaseController {
  constructor() {
    super("/api/posts");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getPostById)
      .get("/:id/comments", this.getCommentsOnPost)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPost)
      .put("/:id", this.editPost)
      .put(':/id',this.editVote)
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

  async editPost(req, res, next) {
    try {
      let postData = req.body
      postData.creatorId = req.userInfo.id
      let post = await postsService.editPost(req.params.id, postData)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsOnPost(req, res, next) {
    try {
      let comments = await commentsService.getCommentsOnPost(req.params.id)
      res.send(comments)
    } catch (error) {
      next(error)
    }
  }

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

  async editVote(req,res,next) {
    try {
    const postId = req.params.id
    const userId = req.userInfo.id
    await postsService.editVote(postId, userId)
    } catch (error) {
    next(error) 
    }
  }


}
