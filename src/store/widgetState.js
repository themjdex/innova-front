import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class WidgetState {

	valutesWhiteList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34];
	currentValues = [];
	yesterdayValues = [];

	constructor() {
		makeAutoObservable(this);
	}

	getCurrentValues() {
		return this.currentValues;
	}

	async setCurrentValues() {
		const res = await axios.get('http://localhost:8010/proxy');
		this.currentValues = res.data;
	}

	getYesterdayValues() {
		return this.yesterdayValues;
	}

	async setYesterdayValues(date) {
		const res = await axios.get(`http://localhost:8010/proxy/?date=${date}`);
		this.yesterdayValues = res.data;
	}

	getWhiteList() {
		return this.valutesWhiteList;
	}

	changeWhiteList(id) {
		console.log(id)
		this.valutesWhiteList = this.valutesWhiteList.filter(item => item !== id);
		console.log(this.valutesWhiteList);
	}

}

export default new WidgetState();