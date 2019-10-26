// -------------------------------------------------------------------
// :: Accordion
// -------------------------------------------------------------------

import Component from './component'

export default class Accordion extends Component {

	constructor(selector) {

		super(selector)

		this.$articles = this.element.querySelectorAll('article')
		this.$articles = [...this.$articles]

		this.$active = undefined

	}

	init() {

		

	}

	click(e) {

		if (e.target.nodeName !== 'HEADER') return

		this.$articles.map((article) => article.classList.remove('active'))

		if (e.target.parentNode == this.$active) {
			this.$active = undefined
		} else {
			e.target.parentNode.classList.add('active')
			this.$active = e.target.parentNode
		}

	}

}
