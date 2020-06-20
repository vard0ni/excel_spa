import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent { // Наследуем от ExcelComponent.js
	static className = 'excel__header'

	toHTML() {  // не описываем корневой элемент, так как он создаётся за нас
		return `
			<input type="text" class="input" value="New table" />

     	<div>
     	
      	<div class="button">
        	<i class="material-icons">delete</i>
        </div>

        <div class="button">
        	<i class="material-icons">exit_to_app</i>
        </div>
        
      </div>
		`
	}
}
