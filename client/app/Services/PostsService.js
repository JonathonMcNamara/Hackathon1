import { ProxyState } from "../AppState.js"
import { Post } from "../Models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {

  async getPosts() {
    let res = await api.get('/api/posts')
    ProxyState.posts = res.data.map(p => new Post(p))
  }

  async createPosts() {
    let res = await api.post('/api/posts', postFormData) //create post form comp.
    let post = new Post(res.data)
    ProxyState.posts = [...ProxyState.posts, post]
    console.log(ProxyState.posts);
  }

  async deletePost(postId) {
    await api.delete(`api/posts/${postId}`)
    ProxyState.posts = ProxyState.posts.filter(p => p.creatorId != postId)

  }

}

export const postsService = new PostsService()