// -------------------------------------------------------------------
// :: Accordion
// -------------------------------------------------------------------

import Component from './component'

export default class Accordion extends Component {

	constructor(selector) {

		super(selector)

		this.$articles = [...this.element.querySelectorAll('article')]
		this.$questions = [...this.element.querySelectorAll('[data-accordion="question"]')]
		this.$answers = [...this.element.querySelectorAll('[data-accordion="answer"]')]

		this.$active = undefined

		this.init()

	}

	init() {

		// TODO: Set --height property for the answer ...

		// this.$articles.map(($article, index) => {

		// 	const $temp = $article.cloneNode(true)
		// 	$temp.classList.add('active')

		// 	const $answer = $temp.querySelector('[data-accordion="answer"]')
		// 	const rect = $answer.getBoundingClientRect()
		// 	console.log($answer, rect)

		// })

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
