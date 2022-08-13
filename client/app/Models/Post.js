import { ProxyState } from "../AppState.js"
import { getCommentForm } from "../Components/CommentForm.js"
import { Comment } from "../Models/Comment.js"

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
                  <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Post" onclick="app.postsController.adjustPostForm('${this.id}')"></i>
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
                      ${getCommentForm()}
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