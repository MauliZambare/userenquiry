const enquiryModel = require('../../models/enquiry.model');

let enquiryInsert = (req, res) => {

    let { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }   
    let Enquiry = require('../../models/enquiry.model');
    let enquiry = new Enquiry({
        name: name,
        email: email,
        phone: phone,
        message: message
    });
    enquiry.save().then(() => {
        
        res.send({status: 1 , message: "Enquiry submitted successfully"});
    }).catch((err) => {
        res.send({status: 0, message: "Error in submitting enquiry", error: err.message});
    });
};

let enquiryList = async (req, res) => {
    try {
        let enquiries = await enquiryModel.find();
        res.send({ status: 1, enquiryList: enquiries }); // ✅ Corrected variable name
    } catch (error) {
        console.error("Error in enquiryList:", error);
        res.status(500).send({ status: 0, message: "Server Error" });
    }
};

module.exports = {enquiryInsert , enquiryList};