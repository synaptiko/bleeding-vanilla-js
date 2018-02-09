import { wire, Component } from '/hyperhtml/index.js'

export default class Menu extends Component {
  constructor ({ router, items }) {
    super()
    this.router = router
    this.setState({ items })
  }

  update (state) {
    this.setState(state)
    return this.render()
  }

  render () {
    const { items } = this.state
    return this.html`<ul>${items.map(item =>
      wire(item)`<li>${item}</li>`
    )}</ul>`
  }
}
