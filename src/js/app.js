// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Accordion from "./components/accordion"
import Tabs from "./components/tabs"
import Form from "./components/form"

export default class App {

	constructor(e) {

		document.addEventListener("DOMContentLoaded", (e) => this.init.bind(this))

	}

	init(e) {

		this.accordion = new Accordion('[data-component="accordion]')
		this.tabs = new Tabs('[data-component="tabs]')
		this.form = new Form('[data-component="form]')

	}

	click(e) {

		

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

new App()