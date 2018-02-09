import { bind } from '/hyperhtml/index.js'

export default function layout ({ router, content }) {
  const render = bind(document.body)

  return render`<div class="container">
    <h1>Layout</h1>
    <div class="menu">
      <a href="${router.generate('index')}">Index</a> |
      <a href="${router.generate('list')}">List</a> |
      <a href="${router.generate('list.add')}">Add Item</a> |
      <a href="${router.generate('list.item', { id: 'blah' })}">Show Item</a> |
      <a href="${router.generate('list.edit', { id: 'blah' })}">Edit Item</a> |
      <a href="/giberish">404</a>
    </div>
    <div class="body">
      ${content}
    </div>
  </div>`
}
