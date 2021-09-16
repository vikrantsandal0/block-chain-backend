import * as blockChainControllers from "../controllers/blockChain.controllers";
import { checkCacheIfExists } from "../middleWare/checkCache";
import { getBlocksValidator, getRawBlockValidator } from '../middleware/validator'
import { Router } from "express"
const router = Router()

router.get("/", (req, res) => res.status(200).json({ "Recipe API": "Healthy" }))

/*get blocks  /api/v1/getBlocks */
router.get("/getBlocks", getBlocksValidator, checkCacheIfExists, blockChainControllers.getBlocks);

/*get raw blocks  /api/v1/getRawBlock/:block_hash_id */
router.get("/getRawBlock/:block_hash_id", getRawBlockValidator, checkCacheIfExists, blockChainControllers.getRawBlock);

export default router;