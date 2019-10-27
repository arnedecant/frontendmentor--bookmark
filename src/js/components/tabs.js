// -------------------------------------------------------------------
// :: Tabs
// -------------------------------------------------------------------

import Component from './component'

export default class Tabs extends Component {

	constructor(selector) {

		super(selector, false)
		
		const self = this
        
		this.$nav = this.element.querySelector('[data-tabs="nav"]')
		this.$content = this.element.querySelector('[data-tabs="content"]')

		this.$buttons = this.$nav.querySelectorAll('button')
		this.$articles = this.$content.querySelectorAll('article')

		this.$buttons = [...this.$buttons]
		this.$articles = [...this.$articles]

		this.tab = ''

		this.indicator = { 
			_width: 0,
			_offset: 0,

			get width() { 
				return this._width 
			},
			set width(val) { 
				this._width = val
				self.$nav.style.setProperty('--indicator-width', val + 'px') 
			}, 

			get offset() { 
				return this._offset 
			},
			set offset(val) { 
				this._offset = val
				self.$nav.style.setProperty('--indicator-offset', val + 'px') 
			}
		}
		
		this.init()

	}

	init() {

		// set default active element (tab)

		this.$buttons.map(($button, i) => {

			$button.dataset.index = i
			if ($button.classList.contains('active')) this.tab = $button.dataset.tab

			return $button

		})

		if (!this.tab) this.tab = this.$buttons[0].dataset.tab
		
		this.setActive()

		// NOTE: this.$buttons[0].offsetWidth returns 0, probably because of flex: 1
		// so we need to find a workaround, thus getting the parent offsetWidth and 
		// dividing by the amount of children

		this.indicator.width = this.$nav.offsetWidth / this.$buttons.length

	}

	click(e) {

		if (e.target.nodeName !== 'BUTTON') return

		this.tab = e.target.dataset.tab
		this.setActive()

		this.indicator.offset = this.indicator.width * e.target.dataset.index

	}

	setActive(tab = this.tab) {

		this.tab = tab

		this.$buttons.map(this.activate.bind(this))
		this.$articles.map(this.activate.bind(this))

		console.log(this.$buttons)
		console.log(this.$articles)

	}

	activate(el) {

		if (el.dataset.tab == this.tab) el.classList.add('active')
		else el.classList.remove('active')
		
		return el
	}

}
