import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '/list/:id/edit'
export function handle (name, args, router) {
  const header = name
  const { id } = args

  layout({
    router,
    content: render`<div>
      <h2>${header}: ${id}</h2>
    </div>`
  })
}
