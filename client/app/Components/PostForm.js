import { Post } from "../Models/Post.js";

export function getPostForm(post = new Post({})) {

  let submitAction = 'app.postsController.createPost()'
  if (post.creatorId) {
    submitAction = `app.postsController.editPost('${post.creatorId}')`
  }
  return `
  <form class="col-12 bg-white p-3 elevation-2 rounded" onsubmit="${submitAction}">
    <div class="row">
      <div class="col-8">
        <label class="form-label" for="title">Title</label>
        <input class="form-control" type="text" minlength="5" id="title" name="title" value="${post.title}">
      </div>
      <div class="col-4">
        <label class="form-label" for="title">Team</label>
        <input class="form-control" type="text" minlength="4" id="team" name="team" value="${post.team}">
      </div>
      <div class="col-12">
        <label class="form-label" for="description">Description</label>
        <textarea class="w-100 form-control" name="description" id="description" value="${post.description}"></textarea>
        <div class="col-12">
          <label class="form-label" for="img">Image Url</label>
          <input class="form-control" type="string" id="img" name="img" value="${post.img}">
        </div>
        <button type="submit" class="btn btn-primary w-100 p-2 mt-3 text-light"
          data-bs-dismiss="modal">Submit</button>
      </div>
  </form>
  `
}