const ZEFIR = {
	list: [],
	source: undefined,
	html: {
		select: undefined,
		input: undefined,
		value: undefined,
		dropdown: undefined,
	},
}

function activateZefir() {
	const fillDropdownMenu = function() {
		for (let i = 0; i < ZEFIR.source.options.length; i += 1) {
			const elem = document.createElement('li')

			elem.innerHTML = ZEFIR.source.options[i].innerHTML
			elem.setAttribute('value', ZEFIR.source.options[i].value)

			ZEFIR.list.push({
				name: ZEFIR.source.options[i].innerHTML,
				value: ZEFIR.source.options[i].value,
			})

			ZEFIR.html.dropdown.appendChild(elem)

			if (ZEFIR.source.value === ZEFIR.source.options[i].value) {
				ZEFIR.html.value.setAttribute('value', ZEFIR.source.value)
				ZEFIR.html.value.innerHTML = ZEFIR.source.options[i].innerHTML
			}
		}
	}

	const resetDropdownMenu = function(force = false) {
		const cb = function() {
			;[].forEach.call(ZEFIR.html.dropdown.children, (child) => {
				child.style.display === 'none' ? (child.style.display = 'block') : ''
			})
		}

		force ? cb() : setTimeout(cb, 300)

		ZEFIR.html.input.value = ''
		ZEFIR.html.value.style.display = 'block'
	}

	const setListOption = function(option) {
		ZEFIR.html.select.classList.remove('--opened')
		ZEFIR.html.input.blur()

		ZEFIR.source.value = option.getAttribute('value')

		ZEFIR.html.value.innerHTML = option.innerHTML
		ZEFIR.html.value.setAttribute('value', option.getAttribute('value'))
	}

	const generateZefirSelectMarkup = function() {
		elem = document.createElement('div')
		elem.setAttribute('id', 'zefir-select')
		elem.setAttribute('class', 'zefir-select-container')
		elem.innerHTML = `
			<div class="zefir-select" tabindex="0">
				<div class="zefir-select-inner">
					<div class="zefir-select-selected-value" value=""></div>
					<div class="zefir-select-search">
						<div class="zefir-select-search-inner">
							<input class="zefir-select-search-input" autocomplete="off" value="" />
							<span class="zefir-select-search-mirror">&nbsp;</span>
						</div>
					</div>
				</div>
				<span class="zefir-select-arrow" unselectable="on">
					<i class="zefiricon zefir-select-arrow-icon">
						<svg viewbox="64 64 896 896" width="1em" height="1em" fill="currentColor" focusable="false">
							<path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
						</svg>
					</i>
				</span>
			</div>
			<div class="zefir-select-dropdown">
				<ul class="zefir-select-dropdown-list"></ul>
			</div>
		`

		return elem
	}

	ZEFIR.html.select = generateZefirSelectMarkup()

	ZEFIR.source.parentNode.appendChild(ZEFIR.html.select)

	ZEFIR.html.input = ZEFIR.html.select.querySelector('.zefir-select-search-input')
	ZEFIR.html.value = ZEFIR.html.select.querySelector('.zefir-select-selected-value')
	ZEFIR.html.dropdown = ZEFIR.html.select.querySelector('.zefir-select-dropdown-list')

	fillDropdownMenu()

	console.log(
		'%c🦄🦄🦄 Zefir Select creater 🦄🦄🦄',
		'color: aqua;font-size: 18px;font-weight: bold;'
	)

	ZEFIR.html.input.addEventListener('input', (e) => {
		ZEFIR.html.input.value.length
			? (ZEFIR.html.value.style.display = 'none')
			: (ZEFIR.html.value.style.display = 'block')

		if (ZEFIR.html.input.value.length) {
			;[].forEach.call(ZEFIR.html.dropdown.children, (child) => {
				if (!child.innerHTML.toLowerCase().includes(ZEFIR.html.input.value)) {
					child.style.display = 'none'
				} else if (child.style.display === 'none') {
					child.style.display = 'block'
				}
			})
		} else {
			resetDropdownMenu(true)
		}
	})

	ZEFIR.html.select.addEventListener('click', (e) => {
		if (e.target.closest('.zefir-select-arrow')) {
			ZEFIR.html.select.classList.contains('--focused')
				? ''
				: ZEFIR.html.select.classList.add('--focused')
			ZEFIR.html.select.classList.toggle('--opened')
			ZEFIR.html.select.classList.contains('--opened')
				? ZEFIR.html.input.focus()
				: ZEFIR.html.input.blur()

			return
		}

		if (e.target.tagName === 'LI') {
			setListOption(e.target)
			resetDropdownMenu()

			console.log(
				ZEFIR.source.value,
				ZEFIR.list.find((elem) => elem.value === ZEFIR.source.value).name
			)

			return
		}

		ZEFIR.html.select.classList.add('--focused', '--opened')
		ZEFIR.html.input.focus()
	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('#zefir-select')) {
			ZEFIR.html.select.classList.remove('--focused', '--opened')
			resetDropdownMenu()
		}
	})
}

console.log(
	'%c🍻🍻🍻 DOMContentLoaded 🍻🍻🍻',
	'color: sandyBrown;font-size: 18px;font-weight: bold;'
)
;(function checkDOMChange() {
	ZEFIR.source = document.querySelector("#cycle_version:not([aria-hidden='true'])")

	if (ZEFIR.source && ZEFIR.source.getAttribute('aria-hidden') === 'true') {
		ZEFIR.source = undefined
	}

	ZEFIR.html.select = document.getElementById('zefir-select')

	if (ZEFIR.source && !ZEFIR.html.select) {
		activateZefir()
	} else if (!ZEFIR.source && ZEFIR.html.select) {
		ZEFIR.html.select.parentNode.removeChild(ZEFIR.html.select)
		cconsole.log(
			'%c⭐⭐⭐ Zefir Select removed ⭐⭐⭐',
			'color: gold;font-size: 18px;font-weight: bold;'
		)
	}

	setTimeout(checkDOMChange, 100)
})()
