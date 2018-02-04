import render from '../templates/layout.mjs'

export const pathname = '*'
export function handle (name, args, router) {
  render`
    <div>
      <h1>404</h1>
    </div>
  `
}
