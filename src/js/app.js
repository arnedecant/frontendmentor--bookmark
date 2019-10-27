// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Accordion from "./components/accordion"
import Tabs from "./components/tabs"
import Form from "./components/form"

class App {

	constructor(e) {

		window.addEventListener('load', this.init.bind(this))
		document.addEventListener('click', this.click.bind())

	}

	init(e) {

		// Init components

		this.menu = new Accordion('[data-component="menu"]')
		this.accordion = new Accordion('[data-component="accordion"]')
		this.tabs = new Tabs('[data-component="tabs"]')
		this.form = new Form('[data-component="form"]')

		// TODO: Check current browser and update button order accordingly
		// Chrome first if the user is using Chrome
		// Firefox first if the user is using Firefox

		// TODO: Paralax-like effect on the hero illustration
		// Update the blue background and the illustration itself,
		// according to mouse position, with a different multiplier

		// TODO: Check OS color scheme and apply accordingly
		// Perhaps use CSS: @media (prefers-color-scheme: dark) { ... }

		// TODO: Show modal (new compoennt...) whenever a dummy link is clicked
		// Model shows info about me, the project and also a link to the GitHub
		// repository and perhaps maybe a blogpost about the codebase..?

	}

	click(e) {

		// Disable dummy anchors

		if (e.target.href && e.target.href.endsWith('#')) e.preventDefault()

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()