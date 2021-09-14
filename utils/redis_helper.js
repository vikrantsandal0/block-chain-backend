import redis from 'redis';
import logger from './logger';
import consts from '../static/constants';
import logMsgs from '../static/log_messages';

/* Promise to connect to Redis client */
export const connectSingleNode = () => {
	return new Promise((resolve, reject) => {
		const redisClient = redis.createClient(process.env.REDIS_PORT || 6379);

		redisClient.on(consts.REDIS_EVENT.READY, function () {
			logger.info(logMsgs.redisHlpr_readyEvent);
			resolve(redisClient);
		});

		redisClient.on(consts.REDIS_EVENT.ERROR, function (error) {
			logger.error(logMsgs.redisHlpr_errorEvent + JSON.stringify(error));
			reject(error);
		});
	});
};

/** Syntactic sugar to connect to required Redis server */
export const connect = async () => {
	// Use single client for local development purposes
	global.redisClient = await connectSingleNode();
};

/* Promise to disconnect from Redis client */
export const disconnect = () => {
	if (global.redisClient != undefined) {

		return new Promise((resolve, reject) => {
			redisClient.quit((err, result) => {
				logger.info(logMsgs.redisHlpr_quitCallback);

				if (err) reject(err);
				resolve(result);
			});

			redisClient.on(consts.REDIS_EVENT.ERROR, (error) => {
				logger.error(logMsgs.redisHlpr_errorEvent + JSON.stringify(error));

				reject(error);
			});
		});
	}
};


/* Promise to get a key from Redis client */
export const getKey = async (key) => {

	/* Check if redisClient is connected. If not connect */
	if (typeof redisClient === consts.TYPE.UNDEFINED) {
		await connect();
	}
	logger.info(logMsgs.redisHlpr_getValueLog(key));

	return new Promise((resolve, reject) => {
		redisClient.get(key, function (err, result) {
			logger.info(logMsgs.redisHlpr_getCallback);

			if (err) reject(err);

			logger.info(logMsgs.redisHlpr_getCallbackSuccess);

			resolve(result);
		});
	});
};

/**
 * Function to connect, set a key and disconnect from Redis client
 * key_expiry has to be in seconds
*/
/* Promise to set a key in Redis client */
export const setKey = async (key, value, key_expiry) => {

	/* Check if redisClient is connected. If not connect */
	if (typeof redisClient === consts.TYPE.UNDEFINED) {
		await connect();
	}
	logger.info(logMsgs.redisHlpr_setValueLog(key, value, key_expiry));

	return new Promise((resolve, reject) => {
		redisClient.set(key, value, (setErr, result) => {
			logger.info(logMsgs.redisHlpr_setCallback);

			if (setErr) reject(setErr);
			if (key_expiry) {
				redisClient.expire(key, key_expiry, (expErr, res) => {
					if (expErr) reject(expErr);
					resolve(res);
				});
			}
			resolve(result);
		});
	});
};

/* Delete a key from Redis client */
export const deleteKey = async (key) => {

	/* Check if redisClient is connected. If not connect */
	if (typeof redisClient === consts.TYPE.UNDEFINED){
		await connect();
	}

	return new Promise((resolve, reject) => {
		redisClient.del(key, function(err, result) {
			logger.info(logMsgs.redisHlpr_deleteCallback);
			if (err) reject(err);
			resolve(result);
		});
	});
};