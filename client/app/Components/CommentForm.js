import { Comment } from "../Models/Comment.js"

export function getCommentForm(comment = new Comment({})) {

  let submitAction = 'app.commentsController.createComment()'
  if (comment.creatorId) {
    submitAction = `app.commentsController.editComment('${comment.creatorId}')`
  }
  return `
  post template
  `
}