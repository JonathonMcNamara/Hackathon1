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
      .put("/:id/upVote", this.upVote)
      .put('/:id/downVote', this.downVote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPost)
      .put("/:id", this.editPost)
      .delete('/:id', this.deletePost)
  }
  

  // we need a function for upVote & downVotes as a .post



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

    async upVote(req, res, next) {
    try {
      let vote = await postsService.upVote(req.params.id)
      return res.send(vote)
    } catch (error) {
      next(error)
    }
  }

  async downVote(req,res,next) {
    try {
      let vote = await postsService.downVote(req.params.id)
      return res.send(vote)
    } catch (error) {
      next(error)
    }
  }


}
