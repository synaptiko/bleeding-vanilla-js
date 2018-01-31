import http2 from 'http2'
import fs from 'fs'
import koa from 'koa'
import koaStatic from 'koa-static'
import koaMount from 'koa-mount'

const options = {
	key: fs.readFileSync('localhost-privkey.pem'),
	cert: fs.readFileSync('localhost-cert.pem')
}
const port = 8443
const app = new koa()

async function api(ctx, next) {
	await next()
	ctx.body = {
		content: 'Hello, world! From API!'
	}
}

app.use(koaStatic('public'))
app.use(koaMount('/hyperhtml', koaStatic('node_modules/hyperhtml/esm')))
app.use(koaMount('/api', api))

const server = http2.createSecureServer(options, app.callback())
server.listen(port, () => console.log(`Listening on port ${port}!`))
