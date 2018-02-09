import { wire } from '/hyperhtml/index.js'
import layout from '../templates/layout.mjs'

const render = wire()

export const pathname = '/list/:id'
export function handle (router) {
  const header = router.route.name
  const { id } = router.route.params

  layout({
    router,
    content: render`<div>
      <h2>${header}: ${id}</h2>
    </div>`
  })
}
