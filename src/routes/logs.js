import httpLog from "../controllers/logs.js"
import express from 'express';
import { check } from 'express-validator';
import {validateFields} from "../middleware/validate-fields.js";
import logHelper from "../helpers/logs.js"
const router = express.Router();

router.get('/listlogs',[

],httpLog.listLogs);


router.get('/listlogs/:id',[
    check('id').custom(logHelper.existeLogID),
    // validateFields
],httpLog.listById);



router.post('/addlog',[
    check(),
    // validateFields
], httpLog.addLog);


router.put('/enablelogsbyid/:id',[
    check(),
    // validateFields
],httpLog. enableLog);


router.put('/disablelogsbyid/:id',[
    check(),
    // validateFields
],httpLog. disableLog);


export default router;