import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
	static className = 'excel__table'

	toHTML() {
		return createTable(20)  // в аргументы можем передавать кол-во строк
	}
}
