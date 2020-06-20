// Логика связанная с таблицей

const CODES = {  // диапозон говорит сколько колонок есть всего в таблице
	A: 65,
	Z: 90
}

function toCell() {
	return `
	<div class="cell" contenteditable>
	 
	</div>
	`
}

function toColumn(col) {
	return `
		<div class="column">${col}</div>
	`
}

function createRow(index, content) {
	return `
		<div class="row">
			<div class="row-info">${index ? index : ''}</div>
			<div class="row-data">${content}</div>
		</div>
	`
}

function toChar(_, index) {	// получаем элемент и индекс. Индекс начинается с 0.   el - обозначаем как placeholder(_)
	return String.fromCharCode(CODES.A + index)	// получаем массив из букв
}

// Pure function
export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1  // кол-во столбцов. +1 чтобы появилась буква Z
	const rows = []  // массив строк

	const cols = new Array(colsCount) // новый массив от кол-ва колонок
		.fill('') // заполняем массив пустыми строчками
		.map(toChar)
		.map(toColumn)		// преобразуем всё к шаблону, обрабатываем элемент
		.join('')    // приводим этот массив к строке


	rows.push(createRow(null, cols))

	for (let i = 0; i < rowsCount; i++) {
		const cells = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('')
		rows.push(createRow(i + 1, cells))  // i + 1 так как строчку начинаем с 1, а не с 0
	}

	return rows.join('') // преобразовать массив к строке с разделителем
}
