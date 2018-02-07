import layout from '../templates/layout.mjs'

export const pathname = '/list'
export function handle (name, args, router) {
  const render = layout(router)
  const header = name

  render`
    <div>
      <h2>${header}</h2>
    </div>
  `
}
