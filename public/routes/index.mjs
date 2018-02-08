import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '/'
export function handle (name, args, router) { // TODO jprokop: instead of providing `name` and `args` expose those directly in router and let routes/templates read it from there
  const header = name

  layout({
    router,
    content: render`<div>
      <h2>${header}</h2>
    </div>`
  })
}
