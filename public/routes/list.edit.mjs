import { wire } from '/hyperhtml/index.js'
import Layout from '../templates/layout.mjs'

export const pathname = '/list/:id/edit'
export default class ListEditRoute {
  static get layout () { return Layout }

  constructor ({ router }) {
    this.router = router
    this.name = router.route.name
    this.params = router.route.params
    this.html = wire()
  }

  render () {
    const header = this.name
    const { id } = this.params
    return this.html`<div>
      <h2>${header}: ${id}</h2>
    </div>`
  }
}
