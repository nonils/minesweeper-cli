const {ApiClient} = require("../main");
const assert = require('assert').strict;

const Level = require('../main/model/level');

describe('Api client', function () {
	it('create a new game', function () {
		let client = new ApiClient.ApiClient();
		client.createNewGame(Level.Level.BEGINNER).then(result => {
			assert.equal(result.status, 201);
			assert.equal(result.data.columns, 8);
			assert.equal(result.data.rows, 8);
			assert.equal(result.data.gameFinished, false);
			assert.equal(result.data.win, false);
			assert.equal(result.data.cellsOpened.length, 0);
		});
	});
	it('create a new game custom game', function () {
		let client = new ApiClient.ApiClient();
		client.createNewGame(Level.Level.CUSTOM, 20, 20, 1).then(result => {
			assert.equal(result.status, 201);
			assert.equal(result.data.columns, 20);
			assert.equal(result.data.rows, 20);
			assert.equal(result.data.gameFinished, false);
			assert.equal(result.data.win, false);
			assert.equal(result.data.cellsOpened.length, 0);
		});
	});
	it('create a new game custom game error', function () {
		let client = new ApiClient.ApiClient();
		assert.rejects(async () => await client.createNewGame(Level.Level.CUSTOM))
	});
	it('Open cells', async function () {
		let client = new ApiClient.ApiClient();
		let result = await client.createNewGame(Level.Level.BEGINNER);
		let gameId = result.data.gameId;
		let res = await client.leftClick(gameId, 0, 0)
		assert.equal(res.status, 200);
		if (res.data.gameFinished) {
			assert.equal(res.data.win, false);
		} else {
			assert.equal(res.data.columns, 8);
			assert.equal(res.data.rows, 8);
			assert.equal(res.data.win, false);
			assert.equal(res.data.cellsOpened.length > 0, true);
		}
	}).timeout(10000);
	it('Flag cells', async function () {
		let client = new ApiClient.ApiClient();
		let result = await client.createNewGame(Level.Level.BEGINNER);
		let gameId = result.data.gameId;
		let res = await client.rightClick(gameId, 0, 0)
		assert.equal(res.status, 200);
	}).timeout(10000);

	it('resume game', async function () {
		let client = new ApiClient.ApiClient();
		let result = await client.createNewGame(Level.Level.BEGINNER);
		let res = await client.resumeGame(result.data.gameId);
		assert.equal(res.status, 200);
		assert.equal(res.data.gameId, result.data.gameId);
		assert.equal(res.data.columns, result.data.columns);
		assert.equal(res.data.rows, result.data.rows);
		assert.equal(res.data.gameFinished, result.data.gameFinished);
		assert.equal(res.data.win, result.data.win);
		assert.equal(res.data.cellsOpened.length, result.data.cellsOpened.length);

	}).timeout(10000);

});
