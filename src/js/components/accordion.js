// -------------------------------------------------------------------
// :: Accordion
// -------------------------------------------------------------------

import Component from 'component.js'

export default class Accordion extends Component {

	constructor(selector) {

		super(selector)

	}

	init() {

		super()

	}

	click(e) {

		super()

	}

	render(timestamp) {

        super()

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}
