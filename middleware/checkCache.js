import moment from 'moment';
import helper from '../utils/helper';
import logger from '../utils/logger';
import consts from '../static/constants';
import logMsgs from '../static/log_messages';
import * as errorHandler from '../utils/error_handler'
import * as redisHelper from '../utils/redis_helper'

export const checkCacheIfExists = async (req, res, next) => {
  logger.info(logMsgs.middleware_cIcE_start);
  try {
    req.middleWareObj = {};
    let flow = helper.checkFlowAndParams(req);

    let redisKeyParams = {
      date: moment().subtract(1, "days").format('YYYY-MM-DD'),
      page: req.query.page, blockHashId: req.params.block_hash_id, flow
    }

    //create redis key to check if any data already exists on the basis of API/flow
    const redisKey =  consts.REDIS_KEY.KEY_CREATION(redisKeyParams);

    /* get object/array  stored corresponding to the redisKey */
    let result = await redisHelper.getKey(redisKey);
    if (!result) {
      //if value not available - send key forward so not to create it again
      req.middleWareObj['redisKey'] = redisKey;
      return next();
    }

    try {
      console.log('here value present====');
      result = JSON.parse(result)
    }
    catch (e) {
      await redisHelper.deleteKey(redisKey);
      return next();
    }

    logger.info(logMsgs.redisHlpr_blocksCacheResult(JSON.stringify(result)));
    /**
     * When flow is getRawBlock pagination is done on tx'n of cached data
     * otherwise pagination is done on the outer blocks data we recieve
     */
    let itemsToPaginate = (flow === consts.FLOWS.GET_RAW_BLOCK) ? result.tx : result
    let paginatedResult = helper.getPaginatedData(itemsToPaginate, req.query.page, consts.PAGE_SIZE);

    //send paginated result from cache.
    paginatedResult = {
      ...(flow === consts.FLOWS.GET_RAW_BLOCK ? { data: { ...result, tx: paginatedResult } } : { data: paginatedResult }),
      itemsCount: itemsToPaginate.length
    }
    logger.info(logMsgs.middleware_cIcE_end);

    return res.status(consts.successMHTTPCode).json({
      status: consts.successMHTTPCode,
      responseTimeStamp: + new Date(),
      message: consts.successMsg,
      result: paginatedResult
    });

  } catch (err) {
    /* If errors thrown, return status 400, with the errors.
      If DB structure errors thrown, return status 500*/
    const response = errorHandler.formatErrorMessage(err);
    res.status(response.statusCode).json(response.body);
  }
}