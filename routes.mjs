import fs from 'fs'
import path from 'path'
import util from 'util'
import pathToRegexp, { parse } from 'path-to-regexp'
import sortRoutes from './sort-routes.mjs'

const routesDir = './public/routes'
const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const pathnameRegexp = /^ {2}static get pathname \(\) \{ return '(.*)' \}$/m

async function readPathnames (routesDir, files) {
  // this is temporary and suboptimal solution until Node.js will support dynamic imports!
  return Promise.all(files.map(async (fileName) => {
    const content = await readFile(path.join(routesDir, fileName), 'utf8')
    const match = pathnameRegexp.exec(content)
    return match ? match[1] : undefined
  }).filter((pathname) => !!pathname))
}

function parseAndSplitBySlash (pathname) {
  const tokens = parse(pathname)
  return tokens.reduce((result, part) => {
    if (typeof part === 'string') {
      result.push(...part.split('/').filter(sub => sub.length > 0))
    } else {
      result.push(part)
    }
    return result
  }, [])
}

async function refreshRoutes () {
  // TODO jprokop: add caching mechanism? (development vs production mode)
  const files = await readdir(routesDir)
  const names = files.map((route) => route.replace(/\.mjs$/, ''))
  const pathnames = await readPathnames(routesDir, files)
  const result = pathnames.map((pathname, i) => {
    return {
      pathname,
      name: names[i],
      regexp: (pathname === '*' ? /.*/g : pathToRegexp(pathname)),
      tokens: (pathname === '*' ? ['*'] : parseAndSplitBySlash(pathname))
    }
  })

  result.sort(sortRoutes)

  return result.reduce((map, { pathname, name, regexp }) => {
    map.routes.push([pathname, name])
    map.routeRegexps.push(regexp)
    return map
  }, { routes: [], routeRegexps: [] })
}

export async function isRoute (pathname) {
  const { routes, routeRegexps } = await refreshRoutes()

  for (let i = 0, ln = routeRegexps.length; i < ln; i += 1) {
    const routeRegexp = routeRegexps[i]

    if (routes[i][0] !== '*' && routeRegexp.test(pathname)) {
      return true
    }
  }

  return false
}

export default async function sendRoutes (ctx, next) {
  if (ctx.method === 'HEAD' || ctx.method === 'GET') {
    try {
      const { routes } = await refreshRoutes()
      ctx.body = routes
    } catch (err) {
      throw err
    }
  } else {
    await next()
  }
}
