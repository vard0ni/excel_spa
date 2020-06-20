import {capitalize} from '@core/utils'

export class DomListener { // здесь добавялем изолированные события для какого-то элемента, который наследуется от этого класса
	constructor($root, listeners = []) { // в конструктор получаем корневой элемент $root, на который будем вещать различные слушатели
		if (!$root) {
			throw new Error(`No $root provided for DomListener!`)
		}
		// сохраняем переменные, чтобы были доступны в методах
		this.$root = $root
		this.listeners = listeners
	}

	// добавляем методы-слушатели
	initDOMListeners() {   // добавлять слушатели. Когда его вызываем -> все элементы должны быть в HTML
		this.listeners.forEach(listener => {	// список всех событий - массив. На каждой итерации получаем объект listener
			const method = getMethodName(listener) // method получаем из listener (input -> onInput)
			if (!this[method]) {
				const name = this.name || ''
				throw new Error(`Method ${method} is not implemented in ${name} Component`)
			}
			this[method] = this[method].bind(this)  // переопределяем метод. Метод всегда будет bind(this)
			// То же самое что и addEventListener, указывает на корневой элемент для каждого из компонентов
			this.$root.on(listener, this[method])  // bind(this) - привязать насильно контекст
		})
	}

	removeDOMListeners() {  // удалять слушатели
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			this.$root.off(listener, this[method])
		})
	}
}

// Pure function. Приватная функция для модуля DomListener. input -> onInput
function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}


