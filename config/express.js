import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Datebase from './db';
import middleware from './middleware';
// import api from './api';

const app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
  exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
  limit: '100kb'
}));

// connect to db
new Datebase(null, () => {
	// internal middleware
  app.use(middleware());

	// api router
	// app.use('/api', api());
  app.server.listen(process.env.PORT || 8080);
  console.info(`Started on port ${app.server.address().port}`);
});

export default app;
