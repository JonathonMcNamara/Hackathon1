
export class Comment {
  constructor(data) {
    this.description = data.description
    this.creatorId = data.creatorId
    this.postId = data.postId
  }

  get commentTemplate() {
    return `
    here's the comment template
    <div>${this.description}</div>
    `
  }
}