import render from '../templates/layout.mjs'

export const pathname = '/list/add'
export function handle (name, args) {
  const header = name

  render`
    <div>
      <h1>${header}</h1>
    </div>
  `
}
