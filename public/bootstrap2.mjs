import Navigo from '/navigo/index.js'

const router = new Navigo(null, false, '#')

async function handler(name, args) {
	console.log(name, args)
	const route = await import(`./routes/${name}.mjs`)
	route.handle(name, args, router)
}

async function loadRoutes() {
	const res = await fetch('/routes.json')
	const routes = await res.json()

	router
		.on(routes.reduce((map, route) => {
			map[route[0]] = {
				as: route[1],
				uses: handler.bind({}, route[1])
			}
			return map
		}, {}))
		.resolve()
}

loadRoutes()
