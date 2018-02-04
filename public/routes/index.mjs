import render from '../templates/layout.mjs'

export const pathname = '/'
export function handle (name, args, router) {
  const header = name

  render`
    <div>
      <h1>${header}</h1>
      <a href="${router.generate('list')}">List</a>
      </br>
      <a href="${router.generate('list.add')}">Add Item</a>
      </br>
      <a href="${router.generate('list.item', { id: 'blah' })}">Show Item</a>
      </br>
      <a href="${router.generate('list.edit', { id: 'blah' })}">Edit Item</a>
      </br>
      <a href="/giberish">404</a>
      </br>
    </div>
  `
}
