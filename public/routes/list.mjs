import hyperHTML from '/hyperhtml/index.js'

const render = hyperHTML(document.body)

function update(render) {
	render`
		<div>
			<h1>${header}</h1>
		</div>
	`
}

let header

export function handle(name, args) {
	header = name
	update(render)
}
