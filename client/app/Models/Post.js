import { ProxyState } from "../AppState.js"

export class Post {
  constructor(data) {
    this.postInfo = data.postInfo
    this.creatorId = data.creatorId || ''
    this.team = data.team || ''
    this.title = data.title || ''
    this.img = data.img || ''
    this.description = data.description || ''
    this.votes = data.votes || 0
    this.date = data.date || ''
    this.id = data.id || ''
  }


  get PostTemplate() {
    return `
      <div class="card mb-3 text-dark" style="width: 40rem;">
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span class="d-flex">
                  <i class="mdi mdi-arrow-up-bold-circle text-success selectable" title="UpVote" onclick="app.postsController.upVote('postId')"></i>
                  <!-- inject vote count below -->
                  ${this.votes}
                  <i class="mdi mdi-arrow-down-bold-circle text-danger selectable" title="DownVote" onclick="app.postsController.downVote('postId')"></i>
                  <span class="ms-2">${this.postInfo.name} | ${this.date}</span>
                </span>
                <span>
                  <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Post" onclick="app.postsController.adjustPostForm('${this.id}')" data-bs-toggle="modal" data-bs-target="#createPostModal"></i>
                  <i class="mdi mdi-delete text-danger selectable" title="Delete Post" onclick="app.postsController.deletePost('${this.id}')"></i>
                </span>
              </div>
              <img src="${this.img}" class="card-img px-5" alt="...">
              <h4>${this.title}</h4>
              <p class="card-text">${this.description}
              </p>
              <button class="btn btn-outline-dark rounded-top" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${this.creatorId}" aria-expanded="false" aria-controls="collapseExample">
                Comments
              </button>
              <div class="collapse" id="collapse${this.creatorId}">
                <div class="card card-body bg-secondary">
                  <div class="input-group mb-3" onsubmit="app.commentsController.createComment(commentFormData)">
                    <input type="text" class="form-control" placeholder="Add Comment..."
                      aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text selectable" id="basic-addon2 type="submit">Add</span>
                  </div>
                      ${this.Comments}
                    
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

    `
  }

  get Comments() {
    let template = ''
    let comments = ProxyState.comments.filter(comment => comment.postId == this.id)
    comments.forEach(comment => template += comment.commentTemplate)
    if (template) {
      return template
    } else {
      return `<p>No comments made</p>`
    }
  }
}