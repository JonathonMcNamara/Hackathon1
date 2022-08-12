import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";

export class PostsController extends BaseController {
  constructor() {
    super("/api/posts");
    this.router
      .get("", this.getAll)
      .get("/:id",this.getPostById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createPost)
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
      req.body.creatorId = req.userInfo.id;
      const post = await await postsService.createPost(req.body);
      res.send(post)
    } catch (error) {
      next(error);
    }
  }

  async getPostById(req,res,next){
    try {
      const post = await postsService.getPostById(req.params.id)
      return res.send(post)
    } catch (error) {
      next (error)
    }
  }


}
