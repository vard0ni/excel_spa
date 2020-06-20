// Специальная утилита позволяющая в будущем проще взаимодействовать с dom-деревом. Типо jQuery

class Dom {
	constructor(selector) {  // нужно определить что это за селектор
		this.$el = typeof selector === 'string'  // определяем приватную переменную this.$el с которой в последствии будем работать
			? document.querySelector(selector)  // если это строка
			: selector    // если это dom нода, то просто присваеваем этот селектор в this.$el
	}

	// базовый getter/setter
	html(html) {  // у этого метода есть 2 кейса, которые будут для многих методов работать.
		// 1) Они могут быть как getters/setters. Если мы не передаём никакого параметра в метод html(), то это будет getter.
		// Если передаём то делаем это как setter, и должны вернуть сам instance в последствии
		if (typeof html === 'string') { // если сюда что-то передали, тогда обращаемся к элементу this.$el
			this.$el.innerHTML = html     // используем это как setter, если передали строчку
			return this   // делается для того чтобы выполнялся chain
		}
		// иначе
		return this.$el.outerHTML.trim() // trim() - удаляет лишние пробелы в начале и конце
	}

	clear() {
		this.html('')
		return this
	}

	// дублирует функционал addEventListener(); eventType - строчка input, click и т.п.; callback - функция, которая выполняется
	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback)  // нативный элемент
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback)
	}

	append(node) {		// node - это element в js
		if (node instanceof Dom) {		// если нода является instance класса dom
			node = node.$el  // если это будет нативный элемент, то данная проверка не пройдёт
		}
		// напишем polyfill
		// append и appendChild работают не с классом dom, а с нативными элементами
		if (Element.prototype.append) {  // если такой метод присутствует в базовом классе Element, то юзаем его
			this.$el.append(node)
		} else {
				this.$el.appendChild(node)
		}
		return this   // чтобы могли продолжать делать chain
	}
}

// event.target - тип dom ноды, который можем передавать в конструктор
export function $(selector) {  // работа с dom элементами, шаблоном. Функцию можно импортировать
	return new Dom(selector)  // возвращаем нвый instance Dom
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName)   // создаём элемент по tagName, который передавали
	if (classes) {  // если есть классы отличные от пустой строки, то элементу добавляем класс classes
		el.classList.add(classes)
	}
	return $(el)
}
