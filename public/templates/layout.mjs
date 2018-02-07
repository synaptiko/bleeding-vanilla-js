import slotableRender from './slotable-render.mjs'

export default function layout (router) {
  const render = slotableRender(document.body)

  return render`<div class="container">
    <h1>Layout</h1>
    <div class="menu">
      <a href="${router.generate('index')}">Index</a> |
      <a href="${router.generate('list')}">List</a> |
      <a href="${router.generate('list.add')}">Add Item</a> |
      <a href="${router.generate('list.item', { id: 'blah' })}">Show Item</a> |
      <a href="${router.generate('list.edit', { id: 'blah' })}">Edit Item</a> |
      <a href="/giberish">404</a>
      </br>
    </div>
    <div class="body">
      ${render.slot}
    </div>
  </div>`
}
