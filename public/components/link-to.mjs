import { Component } from '/hyperhtml/index.js'

export default class LinkTo extends Component {
  constructor ({ router, text, name, params }) {
    super()
    this.router = router
    this.setState({ text, name, params })
  }

  update (state) {
    this.setState(state)
    return this.render()
  }

  render () {
    const { text, name, params } = this.state
    const url = this.router.generate(name, params)
    return this.html`<a href="${url}">${text}</a>`
  }

  static bind (router) {
    return function linkTo (text, name, params) {
      return new LinkTo({ router, text, name, params })
    }
  }
}
