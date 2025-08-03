let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete , enquiryUpdate} = require('../../controllers/web/enquiryController');

let enquiryRouter = express.Router();


enquiryRouter.post("/insert",enquiryInsert)

enquiryRouter.get("/view", enquiryList)

enquiryRouter.delete("/enquiryDelete/:id", enquiryDelete);

enquiryRouter.put("/update/:id", enquiryUpdate);



//http://localhost:8000/api/website/enquiry/insert
//http://localhost:8000/api/website/enquiry/view
//http://localhost:8000/api/website/enquiry/enquiryDelete/id
//http://localhost:8000/api/website/enquiry/update/id


module.exports = enquiryRouter;