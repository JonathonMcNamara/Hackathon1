import { CommentsController } from "../Controllers/CommentsController.js"
export class Comment {
  constructor(data) {
    this.creator = data.creator
    this.description = data.description
    this.creatorId = data.creatorId
    this.postId = data.postId
    this.id = data.id
  }

  get commentTemplate() {
    return `
      <div class="border-1 d-flex flex-column rounded elevation-2 p-2 my-2 bg-light text-dark">
        <div class="d-flex flex-column justify-content-between">
          <span class="d-flex justify-content-between">
            <h5>${this.creator.name}</h5>
            <div>
            <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Comment"></i>
            <i onclick="app.commentsController.deleteComment(${this.id})" class="mdi mdi-delete text-danger selectable" title="Delete Comment"></i>
            </div>
          </span>
          <span>
          ${this.description}
          </span>
        </div>
      </div>
    `
  }
}