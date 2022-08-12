export class Post {
  constructor(data) {
    this.team = data.team
    this.title = data.title
    this.img = data.img
    this.description = data.description
    this.votes = data.votes
    this.date = data.date
  }


  get PostTemplate() {
    return `
      Here's the template
      <div>${this.team}</div>
      <div>${this.title}</div>
      <div>${this.img}</div>
      <div>${this.description}</div>
      <div>${this.votes}</div>
      <div>${this.date}</div>
    `
  }
}