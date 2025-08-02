let express = require('express');
const { enquiryInsert, enquiryList } = require('../../controllers/web/enquiryController');
let enquiryRouter = express.Router();


enquiryRouter.post("/insert",enquiryInsert)

enquiryRouter.post("/view", enquiryList)


module.exports = enquiryRouter;