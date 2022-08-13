import { ProxyState } from "../AppState.js"
import { Post } from "../Models/Post.js"
import { api } from "./AxiosService.js"

class PostsService {


  async getPosts() {
    let res = await api.get('/api/posts')
    console.log(res.data);
    ProxyState.posts = res.data.map(p => new Post(p))
    console.log(ProxyState.posts);
  }

  async createPost(postFormData) {
    console.log('create post in service?');
    let res = await api.post('/api/posts', postFormData)
    let post = new Post(res.data)
    ProxyState.posts = [...ProxyState.posts, post]
    console.log(ProxyState.posts);
  }

  async editPost(postId) {
    let
  }

  async deletePost(postId) {
    await api.delete(`/api/posts/${postId}`)
    ProxyState.posts = ProxyState.posts.filter(p => p.id != postId)
  }

}

export const postsService = new PostsService()