import { Comment } from "../Models/Comment.js"

export function getCommentForm(comment = new Comment({})) {

  let submitAction = 'app.commentsController.createComment()'
  if (comment.creatorId) {
    submitAction = `app.commentsController.editComment('${comment.creatorId}')`
  }
  return `
                  <form class="input-group mb-3" onsubmit="app.commentsController.createComment()">
                    <input type="text" class="form-control" placeholder="Add Comment..."
                      aria-label="Recipient's username" aria-describedby="basic-addon2" value="${comment.description}">
                    <button class="btn btn-outline">Add</button>
                  </form>
  `
}