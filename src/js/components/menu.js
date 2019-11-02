// -------------------------------------------------------------------
// :: Menu
// -------------------------------------------------------------------

import Component from './component'

export default class Menu extends Component {

	constructor(selector, hamburger = '[data-toggle="menu"]') {

		super(selector)

		this.$button = document.querySelector(hamburger)
		
		this.$button.addEventListener('click', this.click.bind(this))

	}

	init() {

		

	}

	click(e) {

		if (!e.target.dataset.toggle) return
		if (e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'A') return

		this.$button.classList.toggle('active')
		this.element.classList.toggle('active')


	}

}
