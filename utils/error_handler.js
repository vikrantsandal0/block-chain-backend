/**
 * HELPER ERROR HANDLER METHODS
 */
import helper from './helper';
import logger from './logger';
import consts from '../static/constants';
import logMsgs from '../static/log_messages';

/**
 * Method to log the error name, message and the error object is available
 * @param {Object} err: Contains the generic error thrown
 */
const logErrorMessage = (err) => {
	if (err.name) logger.error(logMsgs.format_err_name(err.name)); // Log the error name
	if (err.message) logger.error(logMsgs.format_err_msg(err.message)); // Log the error message

	err = (helper.isError(err)) ? err.stack : err; // If the err is Error, log the error stack
	if (helper.isObject(err)) // If the err is Object, log the stringified object
		err = (err.original) ? JSON.stringify(err.original) : JSON.stringify(err);

	logger.error(err);
};


/** Method to log and throw error
 * @param {Object} toLog array containing all the error objects
 * @param {Object} toThrow name of field for which errro being thrown*/
export const logAndThrowErr = (toLog, toThrow) => {
	logErrorMessage(toLog);
	throw toThrow;
};

/**	This method formats ALL error messages caught by the last .catch */
export const formatErrorMessage = (err) => {
	logErrorMessage(err);

	logger.info(`${logMsgs.format_err}`);
	return {
		statusCode: err.statusCode || consts.errorHTTPCode,
		body: {
			message: err.message || consts.ISError
		}
	};
};