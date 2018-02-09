import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '/'
export function handle (router) {
  const header = router.route.name

  layout({
    router,
    content: render`<div>
      <h2>${header}</h2>
    </div>`
  })
}
