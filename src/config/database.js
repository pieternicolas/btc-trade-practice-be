import { MongoClient } from 'mongodb';

export default async () => {
	let conn;
	await MongoClient.connect( mongo_conf )
		.then(database => {
			conn = database;
		})
		.catch(err => {
			throw err;
		});
	return conn;
};