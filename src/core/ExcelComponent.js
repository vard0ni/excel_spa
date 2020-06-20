import {DomListener} from '@core/DomListener' // с alias из webpack

export class ExcelComponent extends DomListener {  // наследуется от DomListener
	constructor($root, options = {}) {   // options - это объект(набор опций), который передаём в Formula.js
		super($root, options.listeners)
		this.name = options.name || ''
	}

	toHTML() {  // базовый метод, который возвращает шаблон компонента
		return ''
	}

	init() {  // помещаем все элементы, которые необходимо проинициализировать для компоненты. Сделать это после render() в Excel.js
		this.initDOMListeners()  // приходит из наследования от базового класса DomListener
	}

	destroy() {
		this.removeDOMListeners()
	}
}
