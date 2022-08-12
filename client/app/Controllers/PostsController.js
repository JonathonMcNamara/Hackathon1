import { ProxyState } from "../AppState.js";


function _drawPosts() {
  let template = ''
  ProxyState.posts.forEach(p => template += p.PostTemplate)
  // document.getElementById('post').innerHTML = template
  console.log(template);
}
export class PostsController {
  constructor() {
    ProxyState.on('posts', _drawPosts)
    _drawPosts()
    console.log('post controller');
  }

}