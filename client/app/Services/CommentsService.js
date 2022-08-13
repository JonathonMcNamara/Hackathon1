import { ProxyState } from "../AppState.js"
import { Comment } from "../Models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {


  async getComments() {

    let res = await api.get(`/api/comments`)
    ProxyState.comments = res.data.map(c => new Comment(c))
    console.log(res.data);
  }

  async createComment(commentFormData) {
    let res = await api.post('/api/comments')
    let comment = new Comment(res.data)
    ProxyState.comments = [...ProxyState.comments, comment]
  }

  async deleteComment(commentId) {
    await api.delete(`api/comments/${commentId}`)
    ProxyState.comments.filter(c => c.creatorId != commentId)
  }

}

export const commentsService = new CommentsService()