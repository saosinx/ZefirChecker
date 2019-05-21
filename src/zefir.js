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

console.log('%cDOMContentLoaded', 'color: salmon;')

const zefirMain = document.getElementById('cycle_version') || null

const zefirSelect = document.getElementById('zefir-select')
const zefirInput = zefirSelect.querySelector('.zefir-select-search-input')
const zefirSelectedValue = zefirSelect.querySelector('.zefir-select-selected-value')
const zefirDropdown = zefirSelect.querySelector('.zefir-select-dropdown')
const zefirArrowIcon = zefirSelect.querySelector('.zefir-select-arrow')

for (let i = 0; i < zefirMain.options.length; i += 1) {
	const elem = document.createElement('li')

	elem.innerHTML = zefirMain.options[i].innerHTML
	elem.setAttribute('value', zefirMain.options[i].value)

	zefirDropdown.children[0].appendChild(elem)
}

zefirInput.addEventListener('input', (e) => {
	zefirInput.value.length
		? (zefirSelectedValue.style.display = 'none')
		: (zefirSelectedValue.style.display = 'block')
})

zefirSelect.addEventListener('click', (e) => {
	if (e.target.closest('.zefir-select-arrow')) {
		zefirSelect.classList.contains('--focused') ? '' : zefirSelect.classList.add('--focused')
		zefirSelect.classList.toggle('--opened')
		zefirSelect.classList.contains('--opened') ? zefirInput.focus() : zefirInput.blur()
		return
	}

	if (e.target.tagName === 'LI') {
		zefirSelect.classList.remove('--opened')
		zefirInput.blur()

		zefirSelectedValue.innerHTML = e.target.innerHTML
		zefirSelectedValue.setAttribute('title', e.target.innerHTML)

		return
	}

	zefirSelect.classList.add('--focused')
	zefirSelect.classList.add('--opened')
	zefirInput.focus()
})

document.addEventListener('click', (e) => {
	if (!e.target.closest('#zefir-select')) {
		zefirSelect.classList.remove('--focused', '--opened')
	}
})
