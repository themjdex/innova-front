import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class WidgetState {

	/**
	 * Список валют для рендеринга на странице настроек для сохранения опции скрытия на главной
	 */
	valutesWhiteList = [
		{ id: 1, valute: 'Австралийский доллар', visible: true },
		{ id: 2, valute: 'Азербайджанский манат', visible: true },
		{ id: 3, valute: 'Фунт стерлингов Соединенного королевства', visible: true },
		{ id: 4, valute: 'Армянских драмов', visible: true },
		{ id: 5, valute: 'Белорусский рубль', visible: true },
		{ id: 6, valute: 'Болгарский лев', visible: true },
		{ id: 7, valute: 'Бразильский реал', visible: true },
		{ id: 8, valute: 'Венгерских форинтов', visible: true },
		{ id: 9, valute: 'Гонконгских долларов', visible: true },
		{ id: 10, valute: 'Датских крон', visible: true },
		{ id: 11, valute: 'Доллар США', visible: true },
		{ id: 12, valute: 'Евро', visible: true },
		{ id: 13, valute: 'Индийских рупий', visible: true },
		{ id: 14, valute: 'Казахстанских тенге', visible: true },
		{ id: 15, valute: 'Канадский доллар', visible: true },
		{ id: 16, valute: 'Киргизских сомов', visible: true },
		{ id: 17, valute: 'Китайских юаней', visible: true },
		{ id: 18, valute: 'Молдавских леев', visible: true },
		{ id: 19, valute: 'Норвежских крон', visible: true },
		{ id: 20, valute: 'Польский злотый', visible: true },
		{ id: 21, valute: 'Румынский лей', visible: true },
		{ id: 22, valute: 'СДР (специальные права заимствования)', visible: true },
		{ id: 23, valute: 'Сингапурский доллар', visible: true },
		{ id: 24, valute: 'Таджикских сомони', visible: true },
		{ id: 25, valute: 'Турецких лир', visible: true },
		{ id: 26, valute: 'Новый туркменский манат', visible: true },
		{ id: 27, valute: 'Узбекских сумов', visible: true },
		{ id: 28, valute: 'Украинских гривен', visible: true },
		{ id: 29, valute: 'Чешских крон', visible: true },
		{ id: 30, valute: 'Шведских крон', visible: true },
		{ id: 31, valute: 'Швейцарский франк', visible: true },
		{ id: 32, valute: 'Южноафриканских рэндов', visible: true },
		{ id: 33, valute: 'Вон Республики Корея', visible: true },
		{ id: 34, valute: 'Японских иен', visible: true },
	];

	/**
	 * Массив объектов с курсами на сегодня
	 */
	currentValues = [];
	/**
	 * Массив объектов с курсами за вчера
	 */
	yesterdayValues = [];
	/**
	 * Значения таймера для автоматического обновления
	 */
	timer = 86400000;
	/**
	 * Количество допустимых повторных запросов к серверу для получения данных за сегодня
	 */
	countRequestsForCurrentValues = 5;
	/**
	 * Количество допустимых повторных запросов к серверу для получения данных за вчера
	 */
	countRequestsForYesterdayValues = 5;

	/**
	 * Конструктор класса
	 */
	constructor() {
		makeAutoObservable(this);
	}

	/**
	 * Получить данные курсов за сегодня из стейта
	 * @returns {Array} значения курсов
	 */
	getCurrentValues() {
		return this.currentValues;
	}

	/**
	 * Получить данные курсов за сегодня с сервера
	 */
	async setCurrentValues() {
		const res = await axios.get('http://localhost:8010/proxy');
		if (res.data.length === 0) {
			while (this.countRequestsForCurrentValues > 0) {
				this.setCurrentValues();
				this.countRequestsForCurrentValues -= 1;
			}
		} else {
			this.currentValues = res.data;
		}
	}
	/**
	 * Получить данные курсов за вчера из стейта
	 * @returns {Array} значения курсов
	 */
	getYesterdayValues() {
		return this.yesterdayValues;
	}
	/**
	 * Получит данные курсов за вчера с сервера
	 * @param {string} date требуемая дата
	 */
	async setYesterdayValues(date) {
		const res = await axios.get(`http://localhost:8010/proxy/?date=${date}`);
		if (res.data.length === 0) {
			while (this.countRequestsForYesterdayValues > 0) {
				this.setYesterdayValues(date);
				this.countRequestsForYesterdayValues -= 1;
			}
		} else {
			this.yesterdayValues = res.data;
		}
	}
	/**
	 * Запуск функции перезаписи данных на сервере
	 */
	async updateValues() {
		await axios.get('http://localhost:8010/proxy/update');
	}

	/**
	 * Получить список валют, которые надо показывать
	 * @returns {Array} список валют для рендера
	 */
	getWhiteList() {
		return this.valutesWhiteList;
	}

	/**
	 * Получить информацию о кокретной валюты для последующего считывания свойства visible
	 * @param {number} id Индекс валюты в массиве
	 * @returns {Object} Объект с конкретной инфой по валюте
	 */
	getItemVisibility(id) {
		return this.valutesWhiteList[id];
	}

	/**
	 * Сменить свойство видимости элемента на главной странице
	 * @param {number} id Индекс валюты в массиве
	 */
	changeWhiteList(id) {
		this.valutesWhiteList[id - 1].visible = !this.valutesWhiteList[id - 1].visible;
	}

	/**
	 * Получить текущее значение таймера для апдейта значений
	 * @returns {number} значение таймера
	 */
	getUpdateTimer() {
		return this.timer;
	}

	/**
	 * Установить значение таймера
	 * @param {number} timer новое значение
	 */
	setUpdateTimer(timer) {
		this.timer = timer;
	}

}

export default new WidgetState();