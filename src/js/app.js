// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Menu from "./components/menu"
import Tabs from "./components/tabs"
import Form from "./components/form"
import Accordion from "./components/accordion"

class App {

	constructor(e) {

		window.addEventListener('load', this.init.bind(this))
		document.addEventListener('click', this.click.bind())

	}

	init(e) {

		// Init components

		this.menu = new Menu('[data-component="menu"]')
		this.tabs = new Tabs('[data-component="tabs"]')
		this.form = new Form('[data-component="form"]')
		this.accordion = new Accordion('[data-component="accordion"]')

		// TODO: Check current browser and update button order accordingly
		// Chrome first if the user is using Chrome
		// Firefox first if the user is using Firefox

		// TODO: Scroll-to animation onclick nav link
		// Scroll animation to the section of the page

		// TODO: Animate-in effects whenever a section gets in view
		// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

		// TODO: Paralax-like effect on the hero illustration
		// Update the blue background and the illustration itself,
		// according to mouse position, with a different multiplier

		// TODO: Check OS color scheme and apply accordingly (dark / light)
		// Perhaps use CSS: @media (prefers-color-scheme: dark) { ... }

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
		if ($section.length) this.scrollIntoView($section)

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

	render(timestamp) {

		// add self to the requestAnimationFrame

		window.requestAnimationFrame(this.render.bind(this))

	}

}

export default new App()