import { wire } from '/hyperhtml/index.js'
import Layout from '../templates/layout.mjs'

export const pathname = '/list'
export default class ListRoute {
  static get layout () { return Layout }

  constructor ({ router }) {
    this.router = router
    this.name = router.route.name
    this.html = wire()
  }

  render () {
    const header = this.name
    return this.html`<div>
      <h2>${header}</h2>
    </div>`
  }
}
