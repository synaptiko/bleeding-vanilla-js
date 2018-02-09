import { bind, wire } from '/hyperhtml/index.js'
import Menu from '../components/menu.mjs'
import LinkTo from '../components/link-to.mjs'

export default class Layout {
  constructor ({ router }) {
    this.router = router
    this.html = bind(document.body)

    const linkTo = LinkTo.bind(router)
    this.menu = new Menu({
      router,
      items: [
        linkTo('Index', 'index'),
        linkTo('List', 'list'),
        linkTo('Add', 'list.add', { id: 'blah' }),
        linkTo('Show', 'list.item', { id: 'blah' }),
        linkTo('Edit', 'list.edit', { id: 'blah' }),
        wire()`<a href="/giberish">404</a>`
      ]
    })
  }

  set content (content) {
    this._content = content
  }

  render () {
    return this.html`<div class="container">
      <h1>Layout</h1>
      <div class="menu">
        ${this.menu}
      </div>
      <div class="body">
        ${this._content}
      </div>
    </div>`
  }
}
