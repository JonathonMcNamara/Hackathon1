
export class Comment {
  constructor(data) {
    this.commentInfo = data.commentInfo
    this.description = data.description
    this.creatorId = data.creatorId
    this.postId = data.postId
  }

  get commentTemplate() {
    return `
    <h5>name</h5>
    <span>
      <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Comment"></i>
      <i class="mdi mdi-delete text-danger selectable" title="Delete Comment"></i>
    </span>
    <div>
      <p>
        ${this.description}
    </div>
    `
  }
}