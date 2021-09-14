
import Joi from 'joi';
import logMsgs from '../static/log_messages';
import helper from '../utils/helper';

export const getBlocksValidator = (req, res, next) => {
    logger.info(logMsgs.val_start);
    const schemaToCheck = { ...req.query };
    console.log('schema to check====', schemaToCheck);

    const schema = Joi.object().keys({
        page: Joi.number().optional()
    });
    if (helper.validateFields(schemaToCheck, res, schema)) {
        req.query.page = req.query.page || 1;
        next()
    }
};

export const getRawBlockValidator = (req, res, next) => {
    logger.info(logMsgs.val_start);
    const schemaToCheck = { ...req.query, ...req.params };
    console.log('schema to check====', schemaToCheck);
    const schema = Joi.object().keys({
        block_hash_id: Joi.string().required(),
        page: Joi.number().optional()
    });
    if (helper.validateFields(schemaToCheck, res, schema)) {
        req.query.page = req.query.page || 1;
        next()
    }
};