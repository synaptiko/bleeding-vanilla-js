import hyperHTML from '/hyperhtml/index.js'

const render = hyperHTML(document.body)

function update(render) {
	render`
		<div>
			<h1>${header}: ${id}</h1>
		</div>
	`
}

let header, id

export function handle(name, args) {
	header = name
	id = args.id
	update(render)
}

