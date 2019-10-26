// -------------------------------------------------------------------
// :: Component
// -------------------------------------------------------------------

export default class Component {

	constructor(selector) {

        this.selector = selector
		this.element = document.querySelector(selector)
		
		if (!this.element) {
			console.warn(`No element found for selector: ${ selector }`)
			return
		}
        
        this.element.addEventListener('click', this.click.bind(this))

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
