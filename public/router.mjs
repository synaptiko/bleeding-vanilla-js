// this module doesn't export anything, it's here as it's a dependency
import * as onPushState from '/onpushstate/index.js' // eslint-disable-line no-unused-vars
import pathToRegexp, { compile } from '/path-to-regexp/index.mjs'

export default class Router {
  constructor (routes) {
    this.routes = []
    this.toPathMap = {}
    this.routeInfo = new WeakMap()

    // TODO jprokop: sort routes:
    // - * has to be the last
    // - /list/:id has to be after /list/add, for example; use parse tokens for this logic!
    routes.forEach(([route, name, handler]) => {
      const keys = []
      const routeRegexp = (route === '*' ? /.*/g : pathToRegexp(route, keys))
      this.routes.push(routeRegexp)
      this.routeInfo.set(routeRegexp, {
        name,
        handler,
        paramNames: keys.map(({ name }) => name)
      })
      this.toPathMap[name] = compile(route)
    })
  }

  navigate (pathnameOrName, params) {
    let pathname

    if (pathnameOrName.indexOf('/') !== -1) { // pathname
      pathname = pathnameOrName
    } else { // name with params
      pathname = this.generate(pathnameOrName, params)
    }

    window.history.pushState(window.location.href, document.title, pathname)
    this.resolve()
  }

  generate (name, params) {
    return this.toPathMap[name](params)
  }

  resolve () {
    const current = window.location.pathname
    const routes = this.routes

    if (!this.bound) {
      window.addEventListener('pushstate', this)
      window.addEventListener('popstate', this)
      this.bound = true
    }

    for (let i = 0, ln = routes.length; i < ln; i += 1) {
      const route = routes[i]
      const match = route.exec(current)

      if (match !== null) {
        const { name, handler, paramNames } = this.routeInfo.get(route)
        const params = paramNames.reduce((map, paramName, i) => {
          const value = match[i + 1]
          if (value !== undefined) {
            map[paramName] = value
          }
          return map
        }, {})

        this._route = Object.freeze({
          name,
          params: Object.freeze(params)
        })

        handler.call(this, this)
        break
      }
    }
  }

  handleEvent (event) {
    this.resolve()
  }

  get route () {
    return this._route
  }
}
