import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import './scss/index.scss'


// Создаём базу для приложения -> фреймворк(набор кода, позволяющий автоматизировать определённые элементы создания логики приложения)

const excel = new Excel('#app', { // конструктор, в который передаётся селектор -> в который передаётся набор опций
	components: [Header, Toolbar, Formula, Table]  // массив компонент, не создаём instance -> а передаём класс
})

excel.render()  // получим div с id="app". После него вызываем initDOMListeners для каждого из компонентов
