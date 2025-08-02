const enquiryModel = require('../../models/enquiry.model');

let enquiryInsert = (req, res) => {
    let { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    let enquiry = new enquiryModel({
        name,
        email,
        phone,
        message
    });

    enquiry.save().then(() => {
        res.send({ status: 1, message: "Enquiry submitted successfully" });
    }).catch((err) => {
        res.send({ status: 0, message: "Error in submitting enquiry", error: err.message });
    });
};

let enquiryList = async (req, res) => {
    try {
        let enquiries = await enquiryModel.find();
        res.send({ status: 1, enquiryList: enquiries });
    } catch (error) {
        console.error("Error in enquiryList:", error);
        res.status(500).send({ status: 0, message: "Server Error" });
    }
};

let enquiryDelete = async (req, res) => {
    let enqId = req.params.id;
    let enquiry = await enquiryModel.deleteOne({ _id: enqId });
    res.send({ status: 1, message: "Enquiry deleted successfully", enquiry });
};

let enquirysingleRow = async (req, res) => {
    let enqId = req.params.id;
    let enquiry = await enquiryModel.findOne({ _id: enqId });
    res.send({ status: 1, enquiry });
};

let updateEnquiry = async (req, res) => {
    let enqId = req.params.id;
    let { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ status: 0, message: "All fields are required" });
    }

    try {
        let result = await enquiryModel.updateOne(
            { _id: enqId },
            { $set: { name, email, phone, message } }
        );

        if (result.modifiedCount === 0) {
            return res.send({ status: 0, message: "No changes made or ID not found" });
        }

        res.send({ status: 1, message: "Enquiry updated successfully" });
    } catch (err) {
        res.status(500).send({ status: 0, message: "Error updating enquiry", error: err.message });
    }
};

module.exports = {
    enquiryInsert,
    enquiryList,
    enquiryDelete,
    enquirysingleRow,
    updateEnquiry // ✅ Exporting new update controller
};
