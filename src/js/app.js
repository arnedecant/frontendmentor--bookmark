// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Menu from './components/menu.js'
import Tabs from './components/tabs.js'
import Form from './components/form.js'
import Accordion from './components/accordion.js'

import { getBrowser } from './utilities/dom.js'

class App {

	constructor(e) {

		window.addEventListener('load', this.load.bind(this))
		document.addEventListener('click', this.click.bind())

	}

	load(e) {

		// Components

		this.menu = new Menu('[data-component="menu"]')
		this.tabs = new Tabs('[data-component="tabs"]')
		this.form = new Form('[data-component="form"]')
		this.accordion = new Accordion('[data-component="accordion"]')

		// Elements

		this.$sections = [...document.querySelectorAll('body > header, main > section, body > footer')]
		this.$images = [...document.querySelectorAll('[data-src]')]

		// Events

		this.observer = new IntersectionObserver(this.intersect.bind(this))

		// Init

		this.init()

	}

	init() {

		// Lazy load images

		for (const $img of this.$images) this.observer.observe($img)

		// Animate-in sections

		for (const $section of this.$sections) this.observer.observe($section)

		// Check current browser and update button order accordingly

		this.setBrowserButtons()

		// TODO: Paralax-like effect on the hero illustration
		// Update the blue background and the illustration itself,
		// according to mouse position, with a different multiplier

		// TODO: Check OS color scheme and apply accordingly (dark / light)
		// Perhaps use CSS: @media (prefers-color-scheme: dark) { ... }
		// Add a toggle button to enable/disable dark mode

		// TODO: Show modal (new component...) whenever a dummy link is clicked
		// Modal shows info about me, the project and also a link to the GitHub
		// repository and perhaps maybe a link to a blogpost about the codebase..?

	}

	click(e) {

		// NOTE: e.target.href is a converted string, including domain
		// e.target.getAttribute('href) gets the actual value as written in HTML

		const href = e.target.getAttribute('href')

		// Disable dummy anchors

		if (href) e.preventDefault()
		if (href == '#') return

		// Smooth scroll-to animation onclick nav link
		
		const $section = document.querySelector(href)
		if ($section) this.scrollIntoView($section)

	}

	intersect(elements) {

		// INFO: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

		for (const el of elements) {

			if (!el.isIntersecting || !el.target) continue

			// We could unwatch our elements right here, but it makes more sense
			// to do this per function. This way it's easier expanding in the future
			// => this.observer.unobserve(el)

			if (el.target.nodeName == 'IMG') this.lazyload(el.target)
			else this.animate(el.target)

		}

	}

	lazyload(el) {

		this.observer.unobserve(el)

		el.src = el.dataset.src
		el.onload = () => el.classList.add('loaded')

		return el

	}

	animate(el) {
		
		this.observer.unobserve(el)
		
		el.classList.add('animate-in')

	}

	scrollIntoView(el) {

		// NOTE: alternative method: element.scrollIntoView({ behavior: 'smooth' })
		// only works when element is a direct child of the body element. As this
		// Web API only provides for the parent to scroll. What we have is 
		// body > main > section, which would scroll the main element.

		// el.scrollIntoView({ behavior: 'smooth' })

		// window.scroll({
		// 	top: 2500, 
		// 	left: 0, 
		// 	behavior: 'smooth'
		// })

	}

	setBrowserButtons() {

		// key: value => primary: secondary buttons

		const setup = {
			'chrome': 'firefox',
			'firefox': 'chrome',
			'opera': 'chrome',
		}

		// lookups

		const $buttons = [...document.querySelectorAll('[data-browser]')]
		// const $parent = $buttons[0].parentNode
		const browser = getBrowser()
		const browserAlt = setup[browser] ? setup[browser] : 'firefox'
		const browsers = [browser, browserAlt]

		let html = ''

		// update current buttons

		$buttons.map(($button, index) => {

			if ($button.dataset.browser == browsers[index]) return $button

			$button.dataset.browser = browsers[index]
			$button.innerHTML = `Get it on ${ browsers[index] }`

			return $button

		})

	}

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()