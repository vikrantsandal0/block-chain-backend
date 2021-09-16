import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import blockChainRoutes from './routes/blockChain.routes';
import logger from './utils/logger';
import consts from './static/constants';
import errorConsts from './static/error_constants';
import logMsgs from './static/log_messages';
import * as redisHelper from './utils/redis_helper';

const app = express();
let server;
try {

	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 2 }));
	app.use(bodyParser.json());

	//Body Parser error handler middleware
	app.use(function (error, req, res, next) {
		if (error instanceof SyntaxError) {
			return res.status(consts.badReqHTTPCode).json({
				error_code: errorConsts.errorCodes.invalidValue,
				message: `${consts.RESPONSE_MESSAGES.INVALID_JSON}: ${error.message}`
			});
		} else {
			next();
		}
	});

	//CORS middleware
	app.use(cors());

	app.use('/api/v1', blockChainRoutes);

	app.use((req, res, next) => {
		/* Adding logger for analysis */
		logger.info(`Request Headers: url: ${req.url}; method: ${req.method}; headers: ${JSON.stringify(req.headers)}`);
		next();
	});
	app.get("/", (req, res) => {
		return res.status(200).json({
			status: consts.successMsg,
			message: logMsgs.server_success
		});
	});


	// Asynchronously Connect to the Redis Client -- will connect in its own time
	logger.info(logMsgs.redisHlpr_connecting);
	redisHelper.connect();
	
	//Start server
	const port = process.env.PORT || 5000;
	server = app.listen(port, console.log(`Server started on port ${port}`));
	module.exports = server;
} catch (err) {
	logger.info(logMsgs.server_exit);
	logger.info(err.stack);
	process.exit(1);
}

async function shutDown() {
	logger.info(logMsgs.server_shutdown);
	
	/* Disconnect from redis */
	try{
		const resp = await redisHelper.disconnect();
		if (resp == consts.redisOKResponse) logger.info(logMsgs.server_redisDisconnect);
	}catch(err) {
		logger.error(err.stack);
		process.exit(1);
	}

	/* Close all connections to node server */
	server.close(() => {
		logger.info(logMsgs.server_closeConn);
		process.exit(0);
	});
	logger.info(logMsgs.server_stopConn);

	/* Wait for 10 seconds and then close forcefully */
	setTimeout(() => {
		logger.error(logMsgs.server_killConn);
		process.exit(1);
	}, 10000);
}

process.on(consts.PROCESS_EVENT.SIGINT, shutDown);
process.on(consts.PROCESS_EVENT.SIGTERM, shutDown);
