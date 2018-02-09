import { wire } from '/hyperhtml/index.js'
// import layout from '../templates/layout.mjs'

// const render = wire()

// export const pathname = '/'
// export function handle (router) {
//   const header = router.route.name

//   layout({
//     router,
//     content: render`<div>
//       <h2>${header}</h2>
//     </div>`
//   })
// }

// class Layout {
// }

export const pathname = '/'
export default class IndexRoute {
  // static layout: Layout
  constructor ({ router }) {
    this.router = router
    this.name = router.route.name
    this.html = wire()
  }

  activate () {}
  deactivate () {}

  render () {
    const header = this.name
    return this.html`<div>
      <h2>${header}</h2>
      <a href="/list">list</a>
    </div>`
  }
}
