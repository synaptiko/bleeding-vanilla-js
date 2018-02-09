import { wire } from '/hyperhtml/index.js'

// export default class LinkTo extends Component {
//   constructor ({ router, text, name, params }) {
//     super()
//     this.router = router
//     this.setState({ text, name, params })
//   }

//   update (state) {
//     this.setState(state)
//     return this.render()
//   }

//   render () {
//     const name = this.state.name
//     const url = this.router.generate(name, this.state.params)
//     return this.html`<a href="${url}">${this.state.text}</a>`
//   }

  // static bind (router) {
  //   return function linkTo (text, name, params) {
  //     // return new LinkTo({ router, text, name, params })
  //     const url = this.router.generate(name, params)
  //     return wire()`<a href="${url}">${text}</a>`
  //   }
  // }
// }

export default {
  bind: function (router) {
    return function linkTo (text, name, params) {
      const url = router.generate(name, params)
      return wire()`<a href="${url}">${text}</a>`
    }
  }
}
