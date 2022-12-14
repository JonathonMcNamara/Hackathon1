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
    // @ts-ignore
    ProxyState.posts = ProxyState.posts.sort((a, b) => a.date - b.date)
    ProxyState.posts = [...ProxyState.posts, post]
    console.log(ProxyState.posts);
  }

  async editPost(postData) {
    let res = await api.put(`api/posts/${postData.id}`, postData)
    let post = new Post(res.data)
    let postIndex = ProxyState.posts.findIndex(p => p.id == postData.id)
    ProxyState.posts.splice(postIndex, 1, post)
    ProxyState.posts = ProxyState.posts
  }

  async deletePost(postId) {
    await api.delete(`/api/posts/${postId}`)
    ProxyState.posts = ProxyState.posts.filter(p => p.id != postId)
  }

  async upVote(postId) {
    let res = await api.put(`/api/posts/${postId}`)
    // console.log('upvote res', res);
    // res.data.votes--
    await api.put(`/api/posts/${postId}/upVote`)
        ProxyState.posts = ProxyState.posts
  }

  async downVote(postId) {
    let res = await api.put(`/api/posts/${postId}`)
    // console.log('downVote res', res);
    // res.data.votes--
    await api.put(`/api/posts/${postId}/downVote`)
    ProxyState.posts = ProxyState.posts
  }

  async editVote(postId) {
    await api.put(`/api/posts/${postId}`)
    // res.data.votes++
    await api.put(`/api/posts/${postId}/vote`)

  }


}
export const postsService = new PostsService()