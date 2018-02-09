import { wire } from '/hyperhtml/index.js'
import Layout from '../templates/layout.mjs'

export const pathname = '*'
export default class NotFoundRoute {
  static get layout () { return Layout }

  constructor ({ router }) {
    this.router = router
    this.html = wire()
  }

  render () {
    return this.html`<div>
      <h2>404</h2>
    </div>`
  }
}
