import hyperHTML from './hyperhtml/index.js'

const render = hyperHTML(document.body)
let header = 'Hello, world!'

async function loadData() {
	const res = await fetch('/api')
	const body = await res.json()

	header = body.content
	update(render)
}

function update(render) {
	render`
		<div>
			<h1>${header}</h1>
			<h2>It is ${new Date().toLocaleTimeString()}.</h2>
		</div>
	`
}

loadData()

setInterval(update, 1000, render)
update(render)
