import Router from './router.mjs'

export default class ESModuleRouter extends Router {
  constructor (routes) {
    super(routes.map(([ route, name ]) => [ route, name, handler ]))
  }

  async handle (router) {
    const routeToLoad = router.route
    const route = await import(`./routes/${routeToLoad.name}.mjs`)

    // previous action is an async action, it could happen that route was changed
    if (routeToLoad === router.route) {
      route.handle(router)
    }
  }
}

// it is a trick how to extend Router with custom handler
// it requires base Router to call handler with itself bound as `this`
// the reason is that before super is called there is no `this`
// but we need to initialize base router
function handler (...args) {
  this.handle.apply(this, args)
}
