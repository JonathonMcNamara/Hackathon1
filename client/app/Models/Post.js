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
    this.date = new Date(data.createdAt)
    this.id = data.id || ''
    this.toggle = data.toggle || false
    

  }

// on line 35, need to compare the logged in user to the post creator to add or remove hidden to fix the edit.    Or fix it the right way in the server. 


  get PostTemplate() {
    return `
      <div class="card mb-3 text-dark ${this.team == 'jake' ? 'style-jake' : ''} ${this.team == 'mick' ? 'style-mick' : ''}" style="width: 35rem;">
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span class="d-flex">
                  <i class="mdi mdi-arrow-up-bold-circle text-success selectable" title="upVote" onclick="app.postsController.upVote('${this.id}')"></i>
                  ${this.votes}
                  <i class="mdi mdi-arrow-down-bold-circle text-danger selectable" title="downVote" onclick="app.postsController.downVote('${this.id}')"></i>
                  <span class="ms-2">${this.postInfo.name} | ${this.date.toLocaleTimeString()}</span>
                </span>
                <span>
                  <i ${this.id !== this.creatorId ? 'hidden' : ''} class="mdi mdi-pencil text-info selectable me-2" title="Edit Post" onclick="app.postsController.adjustPostForm('${this.id}')" data-bs-toggle="modal" data-bs-target="#createPostModal"></i>
                  <i class="mdi mdi-delete text-danger selectable" title="Delete Post" onclick="app.postsController.deletePost('${this.id}')"></i>
                </span>
              </div>
              <img src="${this.img}" class="card-img px-5" alt="...">
              <h4>${this.title}</h4>
              <p class="card-text">${this.description}
              </p>
              <button class="btn btn-secondary text-light comment-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${this.creatorId}" aria-expanded="false" aria-controls="collapseExample">
                Comments
              </button>
              <div class="collapse" id="collapse${this.creatorId}">
                <div class="card card-body bg-secondary comment-floor">
                      ${getCommentForm(this.id)}
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

  get BootTemplate() {
    return `
    <div class="" style="padding-top: ${this.votes}%;">
    <img src="https://www.nicepng.com/png/detail/968-9687195_anvil-clipart-transparent-png-anvil-clip-art-transparent.png" alt="">
    </div>
    `
  }

}