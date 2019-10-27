'use strict'

// -------------------------------------------------------------------
// :: Form
// -------------------------------------------------------------------

import Component from './component'
import { capitalize } from '../utilities/string'

export default class Form extends Component {

	constructor (selector, options = {}) {

		super(selector, false)

		// set properties

		this.options = options

		// normalize options

		if (this.options.buttons && !Array.isArray(this.options.buttons)) {
			this.options.buttons = [this.options.buttons]
		}

		// init

		this.init()

	}

	init(reset) {

		// reset form

		// if (reset) this.element = null

		// set buttons

		if ((this.options.buttons && reset) || (this.options.buttons && !this.$buttons)) {
			this.$buttons = document.querySelectorAll(this.options.buttons.join(', '))
			this.$buttons = [...this.$buttons]
		}

		// set fields

		this.$fields = this.element.querySelectorAll('fieldset:not(.hide) input, fieldset:not(.hide) textarea, fieldset:not(.hide) select')
		this.$fields = [...this.$fields]

		// only continue if there's no reset

		if (reset) return

		// form events

		this.element.addEventListener('submit', this.submit.bind(this))

		// button events

		if (this.$buttons) this.$buttons.map(($button) => $button.addEventListener('click', this.submit.bind(this)))

		// get all inputs which can toggle something
		// loop them and add event listeners

		const $toggles = [...this.element.querySelectorAll('[data-toggle]')]
		$toggles.map(($toggle) => $toggle.addEventListener('change', this.toggle.bind(this)))

		// set initial data

		this.initialData = this.getData()

	}

	toggle(e) {

		// set toggle element, get all sections which can be
		// toggled and toggle the 'hide' class
		
		const $toggle = e.target
		const $sections = [...this.element.querySelectorAll(`[data-section="${ $toggle.dataset.toggle }"]`)]

		$sections.map(($section) => $section.classList.toggle('hide'))

	}

	submit(e) {

		// prevent actual stuff from happening

		if (e) e.preventDefault()
		let self = this

		// get elements
		// NOTE: elements need to be selected again after the event, because
		// otherwise the field values will be the original values

		// this.init(true)

		// reset

		this.element.classList.remove('show-errors')

		// check if valid

		const isValid = this.validateFields()

		if (this.options.onSubmit) this.options.onSubmit({ data: self.getData(), event: e })

		if (isValid) {

			if (this.options.onSuccess) this.options.onSuccess()

		} else {

			// show errors after timeout to transition

			window.setTimeout((e) => {

				this.element.classList.add('show-errors')
				if (this.options.onError) this.options.onError()

				window.clearTimeout(this)

			}, 100)

		}

	}

	validateFields() {

		// default state

		let valid = true

		// loop fields and validate
		// skip if the field isn't required

		this.$fields.map(($field) => {

			console.log($field)

			if (!$field.hasAttribute('required')) return $field

			const validField = this.validateField($field)
			if (!validField) valid = false

		})

		// return (in)valid state

		return valid

	}

	validateField($field) {

		console.log('validateField:', $field)

		// reset

		$field.classList.remove('invalid')

		// get validation

		const validation = this.isValid($field)

		// get tooltip and remove if exists

		const $tooltip = $field.parentNode.querySelector('.tooltip')
		if ($tooltip) $tooltip.remove()
		
		// no need to continue if the field is valid
		
		if (validation.isValid) return true

		// get and insert message

		const message = this.getValidationMessage(validation, $field)
		$field.parentNode.insertAdjacentHTML('beforeend', this.getTooltipHTML(message))

		// set invalid

		$field.classList.add('invalid')

		// if ya got this far, ya field ain't valid mate

		return false

	}

	getValidationMessage(validation, $field) {

		let dataAttr = 'validation' + capitalize(validation.type)	// 'validationRequired' or 'validationInvalid'
		let message = $field.dataset[dataAttr]

		if (!message) message = this.element.dataset[dataAttr]

		return message

	}

	isValid(field) {

		// set defaults

		let validationType = field.dataset.validationType,
			validation = { isValid: false, type: 'required' },
			regex

		// if the field isn't filled, no need to continue validation

		if (!field.value || field.value == '') return validation

		// if data-validate doesn't exist, take the type of the input

		if (!validationType) validationType = field.type

		// test input with regular expressions, depending on their validationType
		// TODO: add more validation types: phone, date, time, ...

		switch(validationType) {
			case 'email':
				regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				validation = {
					isValid: regex.test(String(field.value).toLowerCase()),
					type: 'invalid'
				}

				break
			case 'vat':
				regex = /^((AT)?U[0-9]{8}|(BE)?0[0-9]{9}|(BG)?[0-9]{9,10}|(HR)?[0-9]{11}|(CY)?[0-9]{8}L|(CZ)?[0-9]{8,10}|(DE)?[0-9]{9}|(DK)?[0-9]{8}|(EE)?[0-9]{9}|(EL|GR)?[0-9]{9}|ES[A-Z][0-9]{7}(?:[0-9]|[A-Z])|(FI)?[0-9]{8}|(FR)?[0-9A-Z]{2}[0-9]{9}|(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})|(HU)?[0-9]{8}|(IE)?[0-9]S[0-9]{5}L|(IT)?[0-9]{11}|(LT)?([0-9]{9}|[0-9]{12})|(LU)?[0-9]{8}|(LV)?[0-9]{11}|(MT)?[0-9]{8}|(NL)?[0-9]{9}B[0-9]{2}|(PL)?[0-9]{10}|(PT)?[0-9]{9}|(RO)?[0-9]{2,10}|(SE)?[0-9]{12}|(SI)?[0-9]{8}|(SK)?[0-9]{10})$/;
				field.value = String(field.value.replace(/ /g,'')).toUpperCase()

				validation = {
					isValid: regex.test(field.value),
					type: 'invalid'
				}

				break
			default:
				validation.isValid = true
				break
		}

		return validation

	}

	getTooltipHTML(text) {

		if (!text) text = this.element.dataset.validationRequired

		return `<span class="tooltip">${ text }</span>`

	}

	getData() {

		// loop all fields, get name and type of input,
		// if the field is a radiobutton and it isn't checked, skip
		// and eventually set key:value pair

		const data = {}

		this.$fields.map(($field) => {

			let name = $field.getAttribute('name'),
				type = $field.getAttribute('type')

			if (type == 'radio' && !$field.checked) return $field

			data[name] = $field.value

		})

		return data

	}

	reset(hard) {

		this.$fields.map(($field) => {

			const key = $field.getAttribute('name')

			if (hard) $field.value = ''
			else $field.value = this.initialData[key]

		})

	}

}

/*

	REGEX: VAT NUMBER

	(AT)?U[0-9]{8} |                              # Austria
	(BE)?0[0-9]{9} |                              # Belgium
	(BG)?[0-9]{9,10} |                            # Bulgaria
	(HR)?[0-9]{11} |                              # Croatia
	(CY)?[0-9]{8}L |                              # Cyprus
	(CZ)?[0-9]{8,10} |                            # Czech Republic
	(DE)?[0-9]{9} |                               # Germany
	(DK)?[0-9]{8} |                               # Denmark
	(EE)?[0-9]{9} |                               # Estonia
	(EL|GR)?[0-9]{9} |                            # Greece
	ES[A-Z][0-9]{7}(?:[0-9]|[A-Z]) |              # Spain
	(FI)?[0-9]{8} |                               # Finland
	(FR)?[0-9A-Z]{2}[0-9]{9} |                    # France
	(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3}) | # United Kingdom
	(HU)?[0-9]{8} |                               # Hungary
	(IE)?[0-9]S[0-9]{5}L |                        # Ireland
	(IT)?[0-9]{11} |                              # Italy
	(LT)?([0-9]{9}|[0-9]{12}) |                   # Lithuania
	(LU)?[0-9]{8} |                               # Luxembourg
	(LV)?[0-9]{11} |                              # Latvia
	(MT)?[0-9]{8} |                               # Malta
	(NL)?[0-9]{9}B[0-9]{2} |                      # Netherlands
	(PL)?[0-9]{10} |                              # Poland
	(PT)?[0-9]{9} |                               # Portugal
	(RO)?[0-9]{2,10} |                            # Romania
	(SE)?[0-9]{12} |                              # Sweden
	(SI)?[0-9]{8} |                               # Slovenia
	(SK)?[0-9]{10}                                # Slovakia

*/