// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

export default class App {

	constructor() {

		this.init()

	}

	init() {

		

	}

	click(e) {

		

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

document.addEventListener("DOMContentLoaded", (e) => new App())