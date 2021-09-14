import * as blockChainControllers from "../controllers/blockChain.controllers";
import { checkCacheIfExists } from "../middleWare/checkCache";
import { Router } from "express"
const router = Router()

router.get("/", (req, res) => res.status(200).json({ "Recipe API": "Healthy" }))
router.get("/getBlocks", checkCacheIfExists, blockChainControllers.getBlocks);
router.get("/getRawBlock/:block_hash_id", checkCacheIfExists, blockChainControllers.getRawBlock);

export default router;