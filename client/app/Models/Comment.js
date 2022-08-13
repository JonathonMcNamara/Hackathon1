
export class Comment {
  constructor(data) {
    this.creator = data.creator
    this.description = data.description
    this.creatorId = data.creatorId
    this.postId = data.postId
  }

  get commentTemplate() {
    return `
    <div class="bg-light my-2 p-2 text-dark rounded">
    <div class="d-flex flex-row justify-content-between">
    <h6>${this.creator.name}</h6>
    <span>
      <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Comment"></i>
      <i class="mdi mdi-delete text-danger selectable" title="Delete Comment"></i>
      </span>
    </div>
    <div>
      <p>
        ${this.description}
      </p>
    </div>
    </div>
    `
  }
}