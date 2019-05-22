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
				zefirSelectedValue.setAttribute('value', zefirList.value)
				zefirSelectedValue.innerHTML = zefirList.options[i].innerHTML
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
		zefirSelectedValue.style.display = 'block'
	}

	const setListOption = function(option) {
		zefirSelect.classList.remove('--opened')
		zefirInput.blur()

		zefirList.value = option.getAttribute('value')

		zefirSelectedValue.innerHTML = option.innerHTML
		zefirSelectedValue.setAttribute('value', option.getAttribute('value'))
	}

	const zefirSelect = document.getElementById('zefir-select')
	const zefirInput = zefirSelect.querySelector('.zefir-select-search-input')
	const zefirSelectedValue = zefirSelect.querySelector('.zefir-select-selected-value')
	const zefirDropdown = zefirSelect.querySelector('.zefir-select-dropdown-list')

	fillDropdownMenu()

	zefirInput.addEventListener('input', (e) => {
		zefirInput.value.length
			? (zefirSelectedValue.style.display = 'none')
			: (zefirSelectedValue.style.display = 'block')

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
}

console.log('%cDOMContentLoaded', 'color: salmon;')

const zefirList = document.getElementById('cycle_version')

zefirList ? activateZefir() : ''
