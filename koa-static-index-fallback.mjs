import send from 'koa-send'
import koaStatic from 'koa-static'
import koaCompose from 'koa-compose'
import { isRoute } from './routes.mjs'

export default function (root, opts) {
  opts = Object.assign({ index: 'index.html' }, opts)

  const handleStatic = koaStatic(root, opts)

  async function handleIndexFallback (ctx, next) {
    let done = false

    if (ctx.method === 'HEAD' || ctx.method === 'GET') {
      try {
        done = await send(ctx, '/', { root, index: opts.index })

        if (!(await isRoute(ctx.path))) {
          ctx.status = 404
        }
      } catch (err) {
        if (err.status !== 404) {
          throw err
        }
      }
    }

    if (!done) {
      await next()
    }
  }

  return koaCompose([handleStatic, handleIndexFallback])
}
