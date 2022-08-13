import { ProxyState } from "../AppState.js";
import { getPostForm } from "../Components/PostForm.js";
import { postsService } from "../Services/PostsService.js";
import { Pop } from "../Utils/Pop.js";


function _drawPosts() {
  let template = ''
  ProxyState.posts.forEach(p => template += p.PostTemplate)
  // @ts-ignore
  document.getElementById('post').innerHTML = template
  document.getElementById('postForm').innerHTML = getPostForm()
}


export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    ProxyState.on('comments', _drawPosts)
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

  async createPost() {
    try {
      console.log('creating a form?');
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target

      // @ts-ignore
      let newPost = {
        // @ts-ignore
        team: form.team.value,
        // @ts-ignore
        title: form.title.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        img: form.img.value,
        // @ts-ignore

      }

      await postsService.createPost(newPost)
      form.reset()
    } catch (error) {
      console.error('[creating posts]', error)
      Pop.error(error)
    }
  }

  adjustPostForm(postId) {
    let post = ProxyState.posts.find(p => p.id == postId)
    document.getElementById('postForm').innerHTML = getPostForm(post)
  }

  async editPost(postId) {
    try {
      window.event.preventDefault()
      let form = window.event?.target

      let newPost = {
        id: postId,
        // @ts-ignore
        team: form.team.value,
        // @ts-ignore
        title: form.title.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        img: form.img.value,
        // @ts-ignore
      }


      await postsService.editPost(newPost)
    } catch (error) {
      console.error('[editing post]', error)
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

  async upVotes(postId) {
    try {
      await postsService.upVotes(postId)
    } catch (error) {
      console.error('[up voting]', error)
      Pop.error(error)
    }
  }
}
