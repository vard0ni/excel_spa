import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	// корневой класс для данного блока
	static className = 'excel__formula'		// статическое поле, чтобы иметь доступ без создания instance класса Formula

	constructor($root) {
		super($root, {  // 2 параметр - объект
			name: 'Formula',		// имя для данного компонента, чтобы определять, где произошла ошибка и что вообще идёт не так
			listeners: ['input', 'click'] 		// добавляем слушатели
		})
	}

	toHTML() {  // обратные кавычки для того, чтобы сохранялось форматирование
		return `
			<div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
		`
 }

 onInput(event) {
		console.log(this.$root)
		console.log('Formula: onInput', event.target.textContent.trim()) // trim() - удалить лишние пробелы
 }

 onClick() {

 }
}
