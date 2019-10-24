// -------------------------------------------------------------------
// :: Tabs
// -------------------------------------------------------------------

import Component from 'component.js'

export default class Tabs extends Component {

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
