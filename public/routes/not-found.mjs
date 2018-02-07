import layout from '../templates/layout.mjs'

export const pathname = '*'
export function handle (name, args, router) {
  const render = layout(router)
  render`
    <div>
      <h2>404</h2>
    </div>
  `
}
