// Взаимосвязь с файлом index.js
// this.$el - контейнер с div-app

import {$} from '@core/dom'

export class Excel {
	constructor(selector, options) {  //options - есть объект, selector - #app
		this.$el = $(selector)  //приватная переменная доступная для класса Excel. Названия dom-элементов через $ для отличия
		this.components = options.components || []  // Массив из классов. Если не определили, по умолчанию будет пустой массив
	}

	getRoot() {  // возвращает корневую ноду для самого excel
		const $root = $.create('div', 'excel')  // создаём элемент div с классом excel

		// Класс констурктор -> можем создавать его instances
		// переопределяем массив
		this.components = this.components.map(Component => {  // пробежимся по массиву и на каждой итерации получаем Component
			const $el = $.create('div', Component.className)
			const component = new Component($el) // создали конструктор

			// DEBUG
			if (component.name) { // если определили name
				window['c' + component.name] = component  // в объект window будем заносить
			}

			$el.html(component.toHTML())
			$root.append($el)
			return component  // возвращаем новый трансформированный объект -> instance класса от которого создаём
		})

		return $root
	}

	render() {  // что-то складываем в шаблон
		this.$el.append(this.getRoot())
		// После того как всё за апендили, пробегаемся по массиву в не зависимости сколько компонент добавили
		this.components.forEach(component => component.init())  //для каждого компонента вызываем метод init

		//есть 4 типа статических строк: afterbegin - после начала, afterend - после конца, beforeend -  до конца, beforebegin - до начала
		//this.$el.insertAdjacentHTML('afterbegin', `<h1>Test</h1>`)  // куда хотим сложить HTML, отобразится test на странице

		/*const node = document.createElement('h1') // вирутально создаём ноды и оперировать их наполнение
		node.textContent = 'TEST'
		this.$el.append(node)*/
	}
}
