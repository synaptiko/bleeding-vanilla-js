import render from '../templates/layout.mjs'

export const pathname = '/list/:id'
export function handle (name, args) {
  const header = name
  const { id } = args

  render`
    <div>
      <h1>${header}: ${id}</h1>
    </div>
  `
}
