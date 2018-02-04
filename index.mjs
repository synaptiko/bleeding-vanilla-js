import http2 from 'http2'
import fs from 'fs'
import Koa from 'koa'
import koaMount from 'koa-mount'
import koaStatic from 'koa-static'
import koaStaticIndexFallback from './koa-static-index-fallback'
import sendRoutes from './routes.mjs'

const app = new Koa()

async function api (ctx, next) {
  ctx.body = {
    content: 'Hello, world! From API!'
  }
}

app.use(koaMount('/routes.json', sendRoutes))
app.use(koaMount('/hyperhtml', koaStatic('node_modules/hyperhtml/esm')))
app.use(koaMount('/onpushstate', koaStatic('node_modules/onpushstate')))
app.use(koaMount('/path-to-regexp', koaStatic('node_modules/path-to-regexp')))
app.use(koaMount('/api', api))
app.use(koaStaticIndexFallback('public', { index: 'index.html' }))

const options = {
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem')
}
const port = 8443
const server = http2.createSecureServer(options, app.callback())
server.listen(port, () => console.log(`Listening on port ${port}!`))
