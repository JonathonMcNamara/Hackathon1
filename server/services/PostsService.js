import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class PostsService {

    async getAll(query = {}) {
        return await dbContext.Posts.find(query).populate('postInfo')
    }

    async getPostById(id) {
        const post = await dbContext.Posts.findById(id).populate('postInfo')
        if (!post) {
            throw new BadRequest('Invalid post')
        }
        return post
    }

    async createPost(body) {
        let post = await dbContext.Posts.create(body)
        await post.populate('postInfo')
        return post
    }

    async editPost(id, postData) {
        let post = await this.getPostById(id)
        if (post.creatorId.toString() != postData.creatorId) {
            throw new Forbidden('This is not your post!')
        }
        post.team = postData.team || post.team
        post.title = postData.title || post.title
        post.description = postData.description || post.description
        post.img = postData.img || post.img
        post.date = postData.date || post.img

        await post.save()
        return post

    }

    async deletePost(postId, userId) {
        const post = await this.getPostById(postId)
        if (post.creatorId.toString() !== userId) {
            throw new Forbidden('Unable to delete post')
        }
        await post.remove()
        return post
    }
}

export const postsService = new PostsService()