const express = require('express');
const router = express.Router();
const {
    enquiryInsert,
    enquiryList,
    enquiryDelete,
    enquirysingleRow,
    updateEnquiry // ✅ Add this
} = require('../../controllers/web/enquiryController');

router.post('/enquiry/insert', enquiryInsert);
router.get('/enquiry/list', enquiryList);
router.get('/enquirysingleRow/:id', enquirysingleRow);
router.delete('/enquiry/delete/:id', enquiryDelete);
router.post('/enquiry/update/:id', updateEnquiry); // ✅ Update route

module.exports = router;
