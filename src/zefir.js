function setListOption(list, string) {
	const children = list.children.length

	for (let i = 0; i < children; i += 1) {
		const child = list.children[i]
		const childString = child.innerHTML.toLowerCase()

		if (childString.includes(string)) {
			list.value = child.value

			list.classList.remove('zefirSuccess')
			void list.offsetWidth
			list.classList.add('zefirSuccess')
		}
	}
}

chrome.runtime.onMessage.addListener((request) => {
	const list = document.getElementById('cycle_version') || null
	const string = request.string.length ? request.string.toLowerCase() : null

	if (list && string) {
		setListOption(list, string)
	}
})

function activateZefir() {
	const fillDropdownMenu = function() {
		for (let i = 0; i < zefirList.options.length; i += 1) {
			const elem = document.createElement('li')

			elem.innerHTML = zefirList.options[i].innerHTML
			elem.setAttribute('value', zefirList.options[i].value)

			zefirDropdown.children[0].appendChild(elem)

			if (zefirList.value === zefirList.options[i].value) {
				zefirSelectedValue.setAttribute('value', zefirList.value)
				zefirSelectedValue.innerHTML = zefirList.options[i].innerHTML
			}
		}
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
	const zefirDropdown = zefirSelect.querySelector('.zefir-select-dropdown')

	fillDropdownMenu()

	zefirInput.addEventListener('input', (e) => {
		zefirInput.value.length
			? (zefirSelectedValue.style.display = 'none')
			: (zefirSelectedValue.style.display = 'block')

		// TODO: form list of options after 'input' event
	})

	zefirSelect.addEventListener('click', (e) => {
		const target = e.target

		if (target.closest('.zefir-select-arrow')) {
			zefirSelect.classList.contains('--focused') ? '' : zefirSelect.classList.add('--focused')
			zefirSelect.classList.toggle('--opened')
			zefirSelect.classList.contains('--opened') ? zefirInput.focus() : zefirInput.blur()

			return
		}

		if (target.tagName === 'LI') {
			setListOption(target)

			return
		}

		zefirSelect.classList.add('--focused', '--opened')
		zefirInput.focus()
	})

	document.addEventListener('click', (e) => {
		if (!e.target.closest('#zefir-select')) {
			zefirSelect.classList.remove('--focused', '--opened')
		}
	})
}

console.log('%cDOMContentLoaded', 'color: salmon;')

const zefirList = document.getElementById('cycle_version')

zefirList ? activateZefir() : ''
