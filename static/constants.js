
/* This file contains all constants*/
exports.FIELD = {

};
exports.service_name = "block-chain-apis";
exports.redisOKResponse = "OK";

exports.BOOLEAN = {
	TRUE: "true",
	FALSE: "false"
};

exports.RESPONSE_MESSAGES = {
	NOT_ENOUGH_STOCKS: "Not enough stocks",
	NO_TRADE_PRESENT: "No such trade present in database",
	NO_SECURITY_PRESENT: "No such security present in database",
	NO_DATA_FOUND: "No data found",
	INVALID_JSON: "Invalid JSON in request body",
};
exports.successMHTTPCode = 200;
exports.badReqHTTPCode = 400;
exports.preconditionFailedHTTPCode = 412;
exports.errorHTTPCode = 503;
exports.notFoundHTTPCode = 404;


exports.processEvents = {
	SIGINT: "SIGINT",
	SIGTERM: "SIGTERM",
	SIGKILL: "SIGKILL"
};

exports.ISError = "Internal Server Error";
exports.successMsg = "SUCCESS";
exports.blockChainUrls = {
	BASE_URL: 'https://blockchain.info/',
	GET_BLOCKS: 'blocks',
	GET_RAW_BLOCK: 'rawblock/'
}
exports.PROCESS_EVENT = {
	SIGINT: "SIGINT",
	SIGTERM: "SIGTERM"
};
exports.REDIS_EVENT = {
	READY: "ready",
	ERROR: "error",
	CONNECT: "connect"
};

exports.TYPE = {
	STRING: "string",
	OBJECT: "object",
	C_OBJECT: "Object",
	C_ARRAY: "Array",
	C_FUNCTION: "Function",
	C_ERROR: "Error",
	NUMBER: "number",
	BOOLEAN: "boolean",
	UNDEFINED: "undefined"
};
exports.FLOWS = {
	GET_BLOCKS: 'getBlocks',
	GET_RAW_BLOCK: 'getRawBlock'
}
exports.REDIS_KEY = {
	//create keys based on flows
	KEY_CREATION: (details) => {
		let key;
		console.log('this===', this);
		switch (details.flow) {
			case 'getBlocks': {
				key = `blocks-${details.date}`;
				break;
			}
			case 'getRawBlock': {
				key = `rawBlock-${details.blockHashId}`;
				break;
			}
		}
		return key;
	}
}
exports.PAGE_SIZE = 8;