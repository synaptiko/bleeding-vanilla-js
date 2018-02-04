import Router from './router.mjs'

export default class ESModuleRouter extends Router {
  constructor (routes) {
    super(routes.map(([ route, name ]) => [ route, name, handler ]))
  }

  async handle (name, params, router) {
    const route = await import(`./routes/${name}.mjs`)
    route.handle(name, params, router)
  }
}

// it is a trick how to extend Router with custom handler
// it requires base Router to call handler with itself bound as `this`
// the reason is that before super is called there is no `this`
// but we need to initialize base router
function handler () {
  this.handle.apply(this, arguments)
}
