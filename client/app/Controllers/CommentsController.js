import { ProxyState } from "../AppState.js";
import { commentsService } from "../Services/CommentsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawComments() {
  let template = ''
  ProxyState.comments.forEach(c => template += c.commentTemplate)

}
export class CommentsController {
  constructor() {
    ProxyState.on('comments', _drawComments)
    ProxyState.on('posts', _drawComments)
    this.getComments()
  }

  async getComments() {
    try {
      console.log('comments here');
      await commentsService.getComments()
    } catch (error) {
      console.error('[getting comments]', error)
      Pop.error(error)
    }
  }

  async createComment(postId) {
    try {
            console.log('creating a comment');
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target

      // @ts-ignore
      let newComment = {
        // @ts-ignore
        description: form.description.value,
        postId
      }

      
      await commentsService.createComment(newComment)
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error('[posting comments]', error)
      Pop.error(error)
    }
  }

  async deleteComment(commentId) {
    try {
      await commentsService.deleteComment(commentId)
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

}