import layout from '../templates/layout.mjs'

export const pathname = '/list/:id/edit'
export function handle (name, args, router) {
  const render = layout(router)
  const header = name
  const { id } = args

  render`
    <div>
      <h2>${header}: ${id}</h2>
    </div>
  `
}
