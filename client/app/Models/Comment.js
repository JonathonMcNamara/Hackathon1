
export class Comment {
  constructor(data) {
    this.creator = data.creator
    this.description = data.description
    this.creatorId = data.creatorId
    this.postId = data.postId
  }

  get commentTemplate() {
    return `
    <div class="border-1 rounded elevation-2 p-2 my-2 bg-light text-dark">
    <div class="d-flex flex-row justify-content-between">
      <span>
        <i class="mdi mdi-arrow-up-bold-circle text-success selectable" title="UpVote"></i>
        <!-- inject vote count below -->
        7
        <i class="mdi mdi-arrow-down-bold-circle text-danger selectable" title="DownVote"></i>
      </span>
    <h5>${this.creator.name}</h5>
    <span>
      <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Comment"></i>
      <i class="mdi mdi-delete text-danger selectable" title="Delete Comment"></i>
    </span>
    <div>
      <p>
        ${this.description}
      </p>
    </div>
    </div>
    </div>
    `
  }
}