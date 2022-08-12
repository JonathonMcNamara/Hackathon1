export class Post {
  constructor(data) {
    this.creatorName = data.postInfo.name
    this.creatorId = data.creatorId
    this.team = data.team
    this.title = data.title
    this.img = data.img
    this.description = data.description
    this.votes = data.votes
    this.date = data.date

  }


  get PostTemplate() {
    return `
      <div class="card mb-3 text-dark" style="width: 40rem;">
            <div class="card-body">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span class="d-flex">
                  <i class="mdi mdi-arrow-up-bold-circle text-success selectable" title="UpVote"></i>
                  <!-- inject vote count below -->
                  ${this.votes}
                  <i class="mdi mdi-arrow-down-bold-circle text-danger selectable" title="DownVote"></i>
                  <span class="ms-2">${this.creatorName} | ${this.date}</span>
                </span>
                <span>
                  <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Post"></i>
                  <i class="mdi mdi-delete text-danger selectable" title="Delete Post" onclick="app.postsController.deletePost('${this.creatorId}')"></i>
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
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Add Comment..."
                      aria-label="Recipient's username" aria-describedby="basic-addon2">
                    <span class="input-group-text selectable" id="basic-addon2">Add</span>
                  </div>
                  <div id="comment">
                    <!-- comments template -->
                    <div class="border-1 rounded elevation-2 p-2 my-2 bg-light text-dark">
                      <div class="d-flex flex-row justify-content-between">
                        <span>
                          <i class="mdi mdi-arrow-up-bold-circle text-success selectable" title="UpVote"></i>
                          <!-- inject vote count below -->
                          7
                          <i class="mdi mdi-arrow-down-bold-circle text-danger selectable" title="DownVote"></i>
                        </span>
                        <h5>name</h5>
                        <span>
                          <i class="mdi mdi-pencil text-info selectable me-2" title="Edit Comment"></i>
                          <i class="mdi mdi-delete text-danger selectable" title="Delete Comment"></i>
                        </span>
                      </div>

                      <div>
                        <p>
                          Some placeholder content for the collapse component. This panel is hidden by default but
                          revealed
                          when the user
                          activates the relevant trigger.
                        </p>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>
          </div>

    `
  }
}