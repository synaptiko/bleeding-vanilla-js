import Router from './es-module-router.mjs'

async function initializeRouter () {
  const res = await fetch('/routes.json')
  const routes = await res.json()
  const router = new Router(routes)
  router.resolve()
}

initializeRouter()
