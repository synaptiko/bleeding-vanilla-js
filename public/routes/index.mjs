import hyperHTML from '/hyperhtml/index.js'

const render = hyperHTML(document.body)
let header, router

function navigate(event) {
	// event.preventDefault()
	// router.navigate(event.target.getAttribute('href'))
}

function update(render) {
	render`
		<div>
			<h1>${header}</h1>
			<a href="${router.generate('list')}">List</a>
		</div>
	`
}

export function handle(name, args, _router) {
	header = name
	router = _router
	update(render)
}
