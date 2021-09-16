module.exports = {

	/* Main Server Messages */
	server_success: "I am successful :-)",


	val_error_generic: "Validation Error: ",
	val_json_schema: "Validating JSON schema",
	val_success_generic: "Validation Pass: ",
	val_itr_error: "Setting JSON validation errors. ",
	val_itr_error_comp: "Setting JSON validation errors: Completed! ",
	middleware_cIcE_start: "checkIfCacheExists : start",
	middleware_cIcE_end: "checkIfCacheExists : end",
	val_format: "Formatting JSON schema validation errors now.",
	format_err: "Formatting errors",
	format_err_name: (name) => `ERROR thrown: name: ${name}`,
	format_err_msg: (message) => `ERROR thrown: message: ${message}`,



	/* Redis Helper related messages*/
	redisHlpr_readyEvent: "Redis Client emitted 'ready' event",
	redisHlpr_errorEvent: "Redis Client emitted 'error' event",
	redisHlpr_readyClstrEvent: "Redis Cluster emitted 'ready' event",
	redisHlpr_errorClstrEvent: "Redis Cluster emitted 'error' event",
	redisHlpr_fullReadyClstrEvent: "Redis Cluster emitted 'fullReady' event",
	redisHlpr_connectClstrEvent: "Redis Cluster emitted 'connect' event",
	redisHlpr_quitCallback: "In Quit callback in Redis Client", 
	redisHlpr_connecting: "Connecting to Redis Client",
	redisHlpr_connected: "Connected to Redis Client",
	redisHlpr_getCallback: "In Get callback in Redis Client",
	redisHlpr_getCallbackSuccess: "In Get callback in Redis Client: Success",
	redisHlpr_setCallback: "In Set callback in Redis Client",
	redisHlpr_setValueLog: (key, value, token_expiry) => `Setting value for key: ${key}, ${value}, ${token_expiry} in Redis Client`,
	redisHlpr_deleteCallback: "In Delete callback in Redis Client",
	redisHlpr_getValueLog: (key) => `Getting value of key: ${key}`,
	redisHlpr_blocksCacheResult : (result) => `blocks cache result : ${result}`,

	/* Server log messages */
	server_exit: "Exiting process because of error: ",
	server_shutdown: "Server shutting down.",
	server_redisDisconnect: "Redis Client has been disconnected.",
	server_closeConn: "Closed out remaining connections",
	server_stopConn: "Received kill signal, shutting down gracefully",
	server_killConn: "Could not close connections in time, forcefully shutting down",

	/* get blocks*/
	gBs_start: "getBlocks: get blocks start",
	gBs_end: "getBlocks: END: get trades ends",
	gBs_valReqBody: "getBlocks: Validating the request body",
	gBs_valReqBodyFail: "getBlocks: Failed: Validating the request body",
	gBs_valReqBodySuccess: "getBlocks: Success: Validating the request body",


	/* get raw block*/
	gRb_start: "getRawBlocks: get raw block starts",
	gRb_end: "getRawBlocks: END: get trades ends",
	gRb_valReqBody: "getRawBlocks: Validating the request body",
	gRb_valReqBodyFail: "getRawBlocks: Failed: Validating the request body",
	gRb_valReqBodySuccess: "getRawBlocks: Success: Validating the request body",

	/* validator  */
	val_start: "validator stat: validating body, query, params start",
};