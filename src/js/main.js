let themeIcon
let addInput
let checkBtn
let deleteBtn
let countOfTodo
let allBtn
let activeBtn
let completedBtn
let clearComletedBtn
let output
let error
let addBtn
let outputList
let outputListArr
let btnArea

let allTodo

let activeTodoesArr
let completedTodoesArr
let allTodoesArr

const prepareDOMElements = () => {
	themeIcon = document.querySelector('.todo-up__presentation--theme-icon')
	addInput = document.querySelector('.todo-up__add--input')
	checkBtn = document.querySelector('.output__box--check')
	deleteBtn = document.querySelector('.output__box--delete')
	countOfTodo = document.querySelector('.amount')
	allBtn = document.querySelector('.buttons__middle--all')
	activeBtn = document.querySelector('.buttons__middle--active')
	completedBtn = document.querySelector('.buttons__middle--completed')
	clearComletedBtn = document.querySelector('.buttons__clear-completed')
	output = document.querySelector('.output')
	error = document.querySelector('.todo-up__error')
	addBtn = document.querySelector('.todo-up__add--add-btn')
	outputList = document.querySelectorAll('.output__box')
	btnArea = document.querySelector('.buttons__middle')

	outputListArr = [...outputList]
}

const prepareDOMEvents = () => {
	addInput.addEventListener('keyup', keyEventCheck)
	addBtn.addEventListener('click', addNewTodo)
	output.addEventListener('click', checkClick)
	output.addEventListener('mousemove', showDeleteBtn)
	output.addEventListener('mouseout', hideDeleteBtn)
	deleteBtn.addEventListener('click', deleteTodo)
	activeBtn.addEventListener('click', showActiveTodo)
	allBtn.addEventListener('click', showAllTodo)
	completedBtn.addEventListener('click', showCompletedTodo)
	btnArea.addEventListener('click', setFocus)
	clearComletedBtn.addEventListener('click', clearComleted)
	themeIcon.addEventListener('click', changeTheme)
}

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

const addNewTodo = e => {
	e.preventDefault()

	if (addInput.value !== '') {
		const newTodo = document.createElement('li')
		newTodo.textContent = addInput.value
		newTodo.classList.add('output__box')
		newTodo.setAttribute('data-box', `${document.body.dataset.bg === 'dark' ? 'dark' : 'light'}`)
		output.append(newTodo)

		const check = document.createElement('button')
		check.classList.add('output__box--check')
		check.setAttribute('data-check', `${document.body.dataset.bg === 'dark' ? 'dark' : 'light'}`)

		const remove = document.createElement('button')
		remove.classList.add('output__box--delete')
		remove.setAttribute('data-delete', `${document.body.dataset.bg === 'dark' ? 'dark' : 'light'}`)

		newTodo.append(check, remove)

		addInput.value = ''
		error.textContent = ''
		countTodoes()
		outputListArr.push(newTodo)
	} else {
		error.textContent = "This field can't be empty"
	}
}

const checkClick = e => {
	if (e.target.matches('.output__box--check')) {
		e.target.closest('li').classList.toggle('complete-todo')
		e.target.closest('button').classList.toggle('complete')
		countTodoes()
	} else if (e.target.matches('.output__box--delete')) {
		deleteTodo(e)
	} else {
		return
	}
}

const showDeleteBtn = e => {
	if (e.target.matches('li')) {
		e.target.lastElementChild.style.display = 'flex'
	} else if (e.target.matches('.output__box--delete')) {
		e.target.style.display = 'flex'
	} else {
		return
	}
}

const hideDeleteBtn = e => {
	if (e.target.matches('li')) {
		e.target.lastElementChild.style.display = 'none'
	} else {
		return
	}
}

const deleteTodo = e => {
	e.target.closest('li').remove('li')

	const allTodo = output.querySelectorAll('li')

	if (allTodo.length === 0) {
		error.textContent = 'You have nothing to do.'
	}
	countTodoes()
}

const countTodoes = () => {
	allTodo = output.querySelectorAll('li')
	const allTodoArr = [...allTodo]
	const completeArr = allTodoArr.filter(
		todo => todo.classList.contains('complete-todo') && todo.firstElementChild.classList.contains('complete')
	)

	const activeArr = allTodoArr.filter(
		todo => !todo.classList.contains('complete-todo') && !todo.firstElementChild.classList.contains('complete')
	)

	countOfTodo.textContent = allTodo.length - completeArr.length

	completedTodoesArr = [].concat(completeArr)
	activeTodoesArr = [].concat(activeArr)
	allTodoesArr = [].concat(completeArr, activeArr)
}

const setFocus = e => {
	const allBtns = btnArea.querySelectorAll('button')
	const btnAreaArr = [...allBtns]
	btnAreaArr.forEach(btn => {
		btn.style.color = 'hsl(234, 11%, 52%)'
		e.target.style.color = 'hsl(220, 98%, 61%)'
	})
}

const showActiveTodo = () => {
	output.innerHTML = activeTodoesArr
		.map(active => {
			return ` <li class="output__box" data-box="${document.body.dataset.bg === 'dark' ? 'dark' : 'light'}">
            <button class="output__box--check" type="button" aria-label="check" data-check="${
							document.body.dataset.bg === 'dark' ? 'dark' : 'light'
						}"></button>
            ${active.textContent}
            <button class="output__box--delete" type="button" aria-label="delete" data-delete="${
							document.body.dataset.bg === 'dark' ? 'dark' : 'light'
						}"></button>
        </li>`
		})
		.join('')
}

const showAllTodo = () => {
	output.innerHTML = allTodoesArr
		.map(all => {
			return `<li class="output__box ${all.classList.contains('complete-todo') ? 'complete-todo' : ''}" data-box="${
				document.body.dataset.bg === 'dark' ? 'dark' : 'light'
			}">
		<button class="output__box--check ${
			all.firstElementChild.classList.contains('complete') ? 'complete' : ''
		}" type="button" aria-label="check" data-check="${document.body.dataset.bg === 'dark' ? 'dark' : 'light'}"></button>
			${all.textContent}
		<button class="output__box--delete" type="button" aria-label="delete" data-delete="${
			document.body.dataset.bg === 'dark' ? 'dark' : 'light'
		}"></button>
	</li>`
		})
		.join('')
}

const showCompletedTodo = () => {
	output.innerHTML = completedTodoesArr
		.map(complete => {
			return `<li class="output__box complete-todo" data-box="${
				document.body.dataset.bg === 'dark' ? 'dark' : 'light'
			}">
		<button class="output__box--check complete" type="button" aria-label="check" data-check="${
			document.body.dataset.bg === 'dark' ? 'dark' : 'light'
		}"></button>
			${complete.textContent}
		<button class="output__box--delete" type="button" aria-label="delete" data-delete="${
			document.body.dataset.bg === 'dark' ? 'dark' : 'light'
		}"></button>
	</li>`
		})
		.join('')
}

const clearComleted = e => {
	completedTodoesArr = []
	allTodoesArr = activeTodoesArr

	if (activeBtn.style.color === 'rgb(58, 123, 253)') {
		showActiveTodo()
	} else if (completedBtn.style.color === 'rgb(58, 123, 253)') {
		showCompletedTodo()
	} else {
		showAllTodo()
		allTodoesArr.length === 0 ? (error.textContent = 'You have nothing to do.') : (error.textContent = '')
	}
}

const changeTheme = e => {
	const checkBtns = document.querySelectorAll('.output__box--check')
	const checkBtnsArr = [...checkBtns]

	const deleteBtns = document.querySelectorAll('.output__box--delete')
	const deleteBtnsArr = [...deleteBtns]

	const buttonsSection = document.querySelector('.buttons')

	themeIcon.classList.toggle('sun')
	themeIcon.classList.toggle('moon')

	if (themeIcon.classList.contains('moon')) {
		document.body.setAttribute('data-bg', 'light')
		addInput.setAttribute('data-input', 'light')
		allTodoesArr.forEach(li => {
			li.setAttribute('data-box', 'light')
		})
		checkBtnsArr.forEach(btn => btn.setAttribute('data-check', 'light'))
		addBtn.setAttribute('data-add', 'light')
		error.setAttribute('data-error', 'light')
		deleteBtnsArr.forEach(btn => btn.setAttribute('data-delete', 'light'))
		buttonsSection.setAttribute('data-buttons', 'light')
		btnArea.setAttribute('data-middle', 'light')
	} else {
		document.body.setAttribute('data-bg', 'dark')
		addInput.setAttribute('data-input', 'dark')
		allTodoesArr.forEach(li => {
			li.setAttribute('data-box', 'dark')
		})
		checkBtnsArr.forEach(btn => btn.setAttribute('data-check', 'dark'))
		addBtn.setAttribute('data-add', 'dark')
		error.setAttribute('data-error', 'dark')
		deleteBtnsArr.forEach(btn => btn.setAttribute('data-delete', 'dark'))
		buttonsSection.setAttribute('data-buttons', 'dark')
		btnArea.setAttribute('data-middle', 'dark')
	}

	if (activeBtn.style.color === 'rgb(58, 123, 253)') {
		showActiveTodo()
	} else if (completedBtn.style.color === 'rgb(58, 123, 253)') {
		showCompletedTodo()
	} else {
		showAllTodo()
	}
}

const keyEventCheck = e => {
	if (e.key === 'Enter') {
		addNewTodo()
	}
}

const sortableList = ev => {
	let items = allTodoesArr,
		current = null

	for (let i of items) {
		i.draggable = true

		i.ondragstart = e => {
			current = i
			for (let it of items) {
				if (it != current) {
					it.classList.add('hint')
				}
			}
		}

		i.ondragenter = e => {
			if (i != current) {
				i.classList.add('active')
			}
		}

		i.ondragleave = () => i.classList.remove('active')

		i.ondragend = () => {
			for (let it of items) {
				it.classList.remove('hint')
				it.classList.remove('active')
			}
		}

		i.ondragover = e => e.preventDefault()

		i.ondrop = e => {
			e.preventDefault()
			if (i != current) {
				let currentpos = 0,
					droppedpos = 0
				for (let it = 0; it < items.length; it++) {
					if (current == items[it]) {
						currentpos = it
					}
					if (i == items[it]) {
						droppedpos = it
					}
				}
				if (currentpos < droppedpos) {
					i.parentNode.insertBefore(current, i.nextSibling)
				} else {
					i.parentNode.insertBefore(current, i)
				}
			}
		}
	}
}

window.addEventListener('DOMContentLoaded', main)
window.addEventListener('DOMContentLoaded', countTodoes)
window.addEventListener('DOMContentLoaded', sortableList)
