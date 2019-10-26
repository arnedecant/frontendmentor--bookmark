// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Accordion from "./components/accordion"
import Tabs from "./components/tabs"
import Form from "./components/form"

class App {

	constructor(e) {

		// document.addEventListener('DOMContentLoaded', (e) => this.init.bind(this))

		this.init()

		document.addEventListener('click', this.click.bind())

	}

	init(e) {

		// Init components

		this.accordion = new Accordion('[data-component="accordion"]')
		this.tabs = new Tabs('[data-component="tabs"]')
		this.form = new Form('[data-component="form"]')

		// TODO: Check current browser and update button order accordingly
		// Chrome first if the user is using Chrome
		// Firefox first if the user is using Firefox

		// TODO: Paralax-like effect on the hero illustration
		// Update the blue background and the illustration itself,
		// according to mouse position, with a different multiplier

	}

	click(e) {

		// Disable dummy anchors

		if (e.target.href.endsWith('#')) e.preventDefault()

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()