import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '*'
export function handle (name, args, router) {
  layout({
    router,
    content: render`<div>
      <h2>404</h2>
    </div>`
  })
}
