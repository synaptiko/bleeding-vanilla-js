import Router from './router.mjs'

export default class ESModuleRouter extends Router {
  constructor (routes) {
    super(routes.map(([ route, name ]) => [ route, name, handler ]))

    this.loadedRoutes = {}
    this.routeInstances = new WeakMap()
    this.layoutInstances = new WeakMap()
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
      if (this.activeRoute && this.activeRoute.deactivate) this.activeRoute.deactivate()
      if (routeInstance.activate) routeInstance.activate()

      this.activeRoute = routeInstance

      const LayoutClass = RouteClass.layout
      let layoutInstance = this.layoutInstances.get(LayoutClass)

      if (!layoutInstance) {
        layoutInstance = new LayoutClass({ router })

        this.layoutInstances.set(LayoutClass, layoutInstance)
      }

      layoutInstance.content = routeInstance.render()
      layoutInstance.render()
    } else {
      if (routeInstance.refreshParams) routeInstance.refreshParams()
      routeInstance.render()
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
