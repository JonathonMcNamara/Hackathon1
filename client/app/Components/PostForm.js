import { Post } from "../Models/Post.js";

export function getPostForm(post = new Post({})) {

  let submitAction = 'app.postsController.createPost()'
  if (post.creatorId) {
    submitAction = `app.carsController.editCar('${post.creatorId}')`
  }
  return `
  post template
  `
}