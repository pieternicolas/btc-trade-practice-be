import { MongoClient } from 'mongodb';

export default async () => {
	let conn;
	await MongoClient.connect('mongodb://localhost:27017/dev')
		.then(database => {
			conn = database;
		})
		.catch(err => {
			throw err;
		});
	return conn;
};