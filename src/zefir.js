const Zefir = {
	list: [],
	select: undefined
}

let zefirList = {}

function activateZefir() {
	const fillDropdownMenu = function() {
		for (let i = 0; i < zefirList.options.length; i += 1) {
			const elem = document.createElement('li')

			elem.innerHTML = zefirList.options[i].innerHTML
			elem.setAttribute('value', zefirList.options[i].value)

			Zefir.list.push({
				name: zefirList.options[i].innerHTML,
				value: zefirList.options[i].value,
			})

			zefirDropdown.appendChild(elem)

			if (zefirList.value === zefirList.options[i].value) {
				zefirValue.setAttribute('value', zefirList.value)
				zefirValue.innerHTML = zefirList.options[i].innerHTML
			}
		}
	}

	const resetDropdownMenu = function(force = false) {
		const cb = function() {
			;[].forEach.call(zefirDropdown.children, (child) => {
				child.style.display === 'none' ? (child.style.display = 'block') : ''
			})
		}

		force ? cb() : setTimeout(cb, 300)

		zefirInput.value = ''
		zefirValue.style.display = 'block'
	}

	const setZefirSelectPosition = function() {
		const rect = zefirList.getBoundingClientRect()
		Zefir.select.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`
		Zefir.select.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`
	}

	const setListOption = function(option) {
		Zefir.select.classList.remove('--opened')
		zefirInput.blur()

		zefirList.value = option.getAttribute('value')

		zefirValue.innerHTML = option.innerHTML
		zefirValue.setAttribute('value', option.getAttribute('value'))
	}

	const generateZefirSelectMarkup = function() {
		elem = document.createElement('div')
		elem.setAttribute('id', 'zefir-select')
		elem.setAttribute('class', 'zefir-select-container');
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

	Zefir.select = generateZefirSelectMarkup()

	zefirList.parentNode.appendChild(Zefir.select)

	const zefirInput = Zefir.select.querySelector('.zefir-select-search-input')
	const zefirValue = Zefir.select.querySelector('.zefir-select-selected-value')
	const zefirDropdown = Zefir.select.querySelector('.zefir-select-dropdown-list')

	fillDropdownMenu()

	setTimeout(setZefirSelectPosition, 100)

	zefirInput.addEventListener('input', (e) => {
		zefirInput.value.length
			? (zefirValue.style.display = 'none')
			: (zefirValue.style.display = 'block')

		if (zefirInput.value.length) {
			;[].forEach.call(zefirDropdown.children, (child) => {
				if (!child.innerHTML.toLowerCase().includes(zefirInput.value)) {
					child.style.display = 'none'
				} else if (child.style.display === 'none') {
					child.style.display = 'block'
				}
			})
		} else {
			resetDropdownMenu(true)
		}
	})

	Zefir.select.addEventListener('click', (e) => {
		if (e.target.closest('.zefir-select-arrow')) {
			Zefir.select.classList.contains('--focused') ? '' : Zefir.select.classList.add('--focused')
			Zefir.select.classList.toggle('--opened')
			Zefir.select.classList.contains('--opened') ? zefirInput.focus() : zefirInput.blur()

			return
		}

		if (e.target.tagName === 'LI') {
			setListOption(e.target)
			resetDropdownMenu()

			console.log(zefirList.value, Zefir.list.find(elem => elem.value === zefirList.value).name)

			return
		}

		Zefir.select.classList.add('--focused', '--opened')
		zefirInput.focus()
	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('#zefir-select')) {
			Zefir.select.classList.remove('--focused', '--opened')
			resetDropdownMenu()
		}
	})

	window.addEventListener('resize', () => setZefirSelectPosition())
}

console.log('%cDOMContentLoaded', 'color: salmon;')

;(function checkDOMChange() {
	zefirList = document.querySelector("#cycle_version:not([aria-hidden='true'])")

	if (zefirList && (zefirList.getAttribute('aria-hidden') === 'true')) {
		zefirList = false
	}

	Zefir.select = document.getElementById('zefir-select')

	if (zefirList && !Zefir.select) {
		activateZefir()
	} else if (!zefirList && Zefir.select) {
		Zefir.select.parentNode.removeChild(Zefir.select)
	}

	setTimeout( checkDOMChange, 100 )
})()

// const cycleVersionTemp = document.createElement('select')
// cycleVersionTemp.setAttribute('id', 'cycle_version')
// cycleVersionTemp.setAttribute('aria-hidden', 'true')
// cycleVersionTemp.innerHTML = `
// 	<option value="1">Joker Goes Wild</option>
// 	<option value="2">Robinhood Mega Stacks</option>
// 	<option value="3">Queen of the Pharaohs</option>
// 	<option value="4">Double Chilli</option>
// 	<option value="5">Blood Sport</option>
// 	<option value="6">Karate Kid</option>
// 	<option value="7">Wild Shot</option>
// 	<option value="8">Gold Shot</option>
// 	<option value="9">Mystical India</option>
// 	<option value="10">Olympic Cash</option>
// 	<option value="11">Polka Reel</option>
// 	<option value="12">Rambo</option>
// `

// document.body.appendChild(cycleVersionTemp)