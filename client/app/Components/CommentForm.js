import { Comment } from "../Models/Comment.js"

export function getCommentForm(postId) {

  let submitAction = 'app.commentsController.createComment()'

  return `
                  <form class="input-group mb-3" onsubmit="app.commentsController.createComment('${postId}')">
                    <input type="text" class="form-control" placeholder="Add Comment... " name="description"
                      aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <button class="btn btn-outline">Add</button>
                  </form>
  `
}