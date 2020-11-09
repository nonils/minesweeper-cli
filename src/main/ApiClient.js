"use strict";
const Level = require("./model/level");
const axios = require('axios');

class ApiClient {

	constructor() {
		this.baseUrl = 'https://sb-minesweeper.herokuapp.com';
		this.uriApi = '/api/';
	}

	async createNewGame(level, cols, rows, mines) {
		if (level === Level.Level.CUSTOM) {
			if (isNaN(cols) || isNaN(rows) || isNaN(mines)) {
				throw new Error("Error trying to generate a new custom game without params");
			}
		}
		const result = await axios.post(this.baseUrl + this.uriApi + 'minesweeper', {
			"columns": cols,
			"level": level,
			"mines": mines,
			"rows": rows
		});
		return result;
	}

	async resumeGame(id) {
		let result = await axios.get(this.baseUrl + this.uriApi + `minesweeper/${id}`).then(response => {
			console.log(response);
		}).catch(err => {
			console.error(err);
		})
		return result;
	}

	async leftClick(id, col, row) {
		if (isNaN(col) || isNaN(row) || isNaN(id)) {
			throw "Error trying to create the operation";
		}
		let result = await axios.put(this.baseUrl + this.uriApi + 'minesweeper', {
			"column": col,
			"gameId": id,
			"row": row
		});
		return result;
	}

	async rightClick(id, col, row) {
		if (isNaN(col) || isNaN(row) || isNaN(id)) {
			throw "Error trying to create the operation";
		}
		let result = await axios.patch(this.baseUrl + this.uriApi + 'minesweeper', {
			"column": col,
			"gameId": id,
			"row": row
		});
		return result;
	}

}

module.exports={ApiClient};
