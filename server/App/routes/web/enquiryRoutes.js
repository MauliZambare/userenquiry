let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete } = require('../../controllers/web/enquiryController');

let enquiryRouter = express.Router();


enquiryRouter.post("/insert",enquiryInsert)

enquiryRouter.get("/view", enquiryList)

enquiryRouter.delete("/enquiryDelete/:id", enquiryDelete);



//http://localhost:8000/api/website/enquiry/insert
//http://localhost:8000/api/website/enquiry/view
//http://localhost:8000/api/website/enquiry/enquiryDelete/id


module.exports = enquiryRouter;