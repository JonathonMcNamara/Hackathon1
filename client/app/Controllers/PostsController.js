import { ProxyState } from "../AppState.js";
import { postsService } from "../Services/PostsService.js";
import { Pop } from "../Utils/Pop.js";


function _drawPosts() {
  let template = ''
  ProxyState.posts.forEach(p => template += p.PostTemplate)
  document.getElementById('post').innerHTML = template
  console.log(template);
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    _drawPosts()
    this.getPosts()
  }

  async getPosts() {
    try {
      await postsService.getPosts()
    } catch (error) {
      console.error('[getting posts]', error)
      Pop.error(error)
    }
  }


  async createPosts() {
    try {
      window.event.preventDefault()
      let form = window.event.target

      let newPost = {
        team: form.team.value,
        title: form.title.value,
        description: form.description.value,
        img: form.img.value,
        votes: form.vote.value,
        date: form.date.value

      }

      await postsService.createPosts()
    } catch (error) {
      console.error('[creating posts]', error)
      Pop.error(error)
    }
  }

  async deletePost(postId) {
    try {
      await postsService.deletePost(postId)
    } catch (error) {
      console.error('[deleting post]', error)
      Pop.error(error)
    }
  }
}