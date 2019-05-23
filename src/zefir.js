const Zefir = {
	list: [],
}

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
		zefirSelect.style.top = `${rect.top + rect.height / 2 + window.scrollY}px`
		zefirSelect.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`
	}

	const setListOption = function(option) {
		zefirSelect.classList.remove('--opened')
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

	const zefirSelect = generateZefirSelectMarkup()

	document.body.appendChild(zefirSelect)

	const zefirInput = zefirSelect.querySelector('.zefir-select-search-input')
	const zefirValue = zefirSelect.querySelector('.zefir-select-selected-value')
	const zefirDropdown = zefirSelect.querySelector('.zefir-select-dropdown-list')

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

	zefirSelect.addEventListener('click', (e) => {
		if (e.target.closest('.zefir-select-arrow')) {
			zefirSelect.classList.contains('--focused') ? '' : zefirSelect.classList.add('--focused')
			zefirSelect.classList.toggle('--opened')
			zefirSelect.classList.contains('--opened') ? zefirInput.focus() : zefirInput.blur()

			return
		}

		if (e.target.tagName === 'LI') {
			setListOption(e.target)
			resetDropdownMenu()

			console.log(zefirList.value, zefirList.options[zefirList.value].innerHTML)

			return
		}

		zefirSelect.classList.add('--focused', '--opened')
		zefirInput.focus()
	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('#zefir-select')) {
			zefirSelect.classList.remove('--focused', '--opened')
			resetDropdownMenu()
		}
	})

	window.addEventListener('resize', () => setZefirSelectPosition())
}

console.log('%cDOMContentLoaded', 'color: salmon;')

const zefirList = document.getElementById('cycle_version')

zefirList ? activateZefir() : ''
