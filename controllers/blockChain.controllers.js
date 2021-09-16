import axios from 'axios';
import consts from "../static/constants";
import logger from '../utils/logger';
import logMsgs from '../static/log_messages';
import * as errorHandler from '../utils/error_handler';
import * as redisHelper from '../utils/redis_helper';
import helper from '../utils/helper';
import moment from 'moment';

const getAxiosInstance = () => {
	return axios.create({
		method: 'get',
		baseURL: consts.blockChainUrls.BASE_URL,
	})
}

export const getBlocks = async (req, res) => {

	logger.info(logMsgs.gBs_start);
	try {
		const { middleWareObj: { redisKey }, query: { page } } = req;
		const axiosInstance = getAxiosInstance()
		console.log('axiosInstance----',axiosInstance.toString());
		const url = `${consts.blockChainUrls.GET_BLOCKS}/${moment().subtract(1, "days").valueOf()}/?format=json`;
		//console.log('await axiosInstance(url);=======',(await axiosInstance(url)).toString());
		const { data } = await axiosInstance(url);
		console.log('result========', data);

        await redisHelper.setKey(redisKey, JSON.stringify(data));
		const paginatedBlocks = helper.getPaginatedData(data, page, consts.PAGE_SIZE);

		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: { data : paginatedBlocks, itemsCount : data.length}
		});
	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};
export const getRawBlock = async (req, res) => {

	logger.info(logMsgs.gRb_start);
	try {
        console.log('req query---', req.query);
		console.log('req params', req.params);
		const { middleWareObj: { redisKey }, params: { block_hash_id: blockHashId }, query: { page } } = req;

		const axiosInstance = getAxiosInstance()

		const url = `${consts.blockChainUrls.GET_RAW_BLOCK}/${blockHashId}`;
		const { data } = await axiosInstance(url);

		console.log('result========', data);
		/**
		 * set value which is data from above api corresponding to key getRawBlocks-blockHashid
		 * getRawBlocks-1233424442 :  data
		 */
		
		await redisHelper.setKey(redisKey, JSON.stringify(data), 600);
		const paginatedTxns = helper.getPaginatedData(data.tx, page, consts.PAGE_SIZE);
		console.log('paginatedTxns========', paginatedTxns);


		return res.status(consts.successMHTTPCode).json({
			status: consts.successMHTTPCode,
			responseTimeStamp: + new Date(),
			message: consts.successMsg,
			result: { data: { ...data, tx: paginatedTxns }, itemsCount : data.tx.length }
		});

	}
	catch (err) {
		/* If errors thrown, return status 400, with the errors.
			If DB structure errors thrown, return status 500*/
		const response = errorHandler.formatErrorMessage(err);
		res.status(response.statusCode).json(response.body);
	}
};