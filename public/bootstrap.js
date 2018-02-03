import hyperHTML from './hyperhtml/index.js'
import Ticker from './Ticker.js'
import Navigo from './navigo/index.js'

const render = hyperHTML(document.body)
let header = 'Hello, world!'

async function loadData() {
	// const res = await fetch('/api')
	const res = await fetch('/data.json')
	const body = await res.json()

	header = body.content
	update(render)
}

function handler() {
	console.log('handler', arguments)
}

const router = new Navigo()
router
	.on({
		'trip/:tripId/edit': { as: 'trip.edit', uses: handler },
		'trip/save': { as: 'trip.save', uses: handler },
		'trip/:action/:tripId': { as: 'trip.action', uses: handler },
    '*': async () => {
			const Home = await import('./routes/Home.js')
			console.log('home', Home.blah())
    }
  })
  .resolve()

function goTo(event) {
	event.preventDefault()
	router.navigate(event.target.getAttribute('href'))
}

function update(render) {
	render`
		<div>
			<h1>${header}</h1>
			<h2>It is ${new Date().toLocaleTimeString()}.</h2>
			<a href="${router.generate('trip.save')}" onclick=${goTo}>Click me</a>
		</div>
	`
}

const ticker = new Ticker(1000)

ticker.addEventListener('tick', () => {
	update(render)
})
update(render)

loadData()
