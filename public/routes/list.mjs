import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '/list'
export function handle (name, args, router) {
  const header = name

  layout({
    router,
    content: render`<div>
      <h2>${header}</h2>
    </div>`
  })
}
