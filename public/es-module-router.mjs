import Router from './router.mjs'
import { bind } from '/hyperhtml/index.js' // FIXME jprokop: only for test, later it will be handled by layout class

export default class ESModuleRouter extends Router {
  constructor (routes) {
    super(routes.map(([ route, name ]) => [ route, name, handler ]))

    this.loadedRoutes = {}
    this.routeInstances = new WeakMap()
  }

  async handle (router) {
    const routeToLoad = router.route
    let RouteClass
    let routeInstance

    if (this.loadedRoutes[routeToLoad.name]) {
      RouteClass = this.loadedRoutes[routeToLoad.name]
      routeInstance = this.routeInstances.get(RouteClass)
    } else {
      const route = await import(`./routes/${routeToLoad.name}.mjs`)
      this.loadedRoutes[routeToLoad.name] = route.default

      RouteClass = route.default
      routeInstance = new RouteClass({ router })

      this.routeInstances.set(RouteClass, routeInstance)
    }

    if (this.activeRoute !== routeInstance) {
      if (this.activeRoute) {
        this.activeRoute.deactivate()
      }

      routeInstance.activate()

      this.activeRoute = routeInstance
    }

    bind(document.body)`${routeInstance.render()}`

    // previous action is an async action, it could happen that route was changed
    // if (routeToLoad === router.route) {
    //   route.handle(router)
    // }
  }
}

// it is a trick how to extend Router with custom handler
// it requires base Router to call handler with itself bound as `this`
// the reason is that before super is called there is no `this`
// but we need to initialize base router
function handler (...args) {
  this.handle.apply(this, args)
}
