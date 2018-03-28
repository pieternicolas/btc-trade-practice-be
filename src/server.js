import 'babel-polyfill';
import express from 'express';

import { port } from './config/';
import routes from './routes/';
import applyMiddleware from './middlewares/';


const app = express();

applyMiddleware(app);
routes(app);

if (process.env.NODE_ENV != 'test')	{
	app.listen(port, () => {
		console.log('We are live on ' + port);
	});
};


export default app;