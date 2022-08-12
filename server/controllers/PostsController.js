import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { postsService } from "../services/PostsService.js";

export class PostsController extends BaseController{
    constructor(){
        super('/api/posts')
        this.router
        .get('',this.getAll)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('',this.createPost)
    }
    
    
    async getAll(req,res,next){
        try {
            const query = req.query
            const posts = await postsService.getAll(query)
            return res.send(posts)   
        } catch (error) {
            next(error)
            
        }
    }
    async createPost(req,res,next) {
        try {
        throw new console.error();    
        } catch (error) {
        next(error)    
        }
    }

    // NOTE COMMENT HERE 
}