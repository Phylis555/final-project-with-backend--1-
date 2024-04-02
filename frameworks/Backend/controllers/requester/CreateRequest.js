const Request = require("../../models/requestFund.model");
const { imageUpload } = require("../../common/imageUpload");
const { validationResult } = require('express-validator/check');

const createRequest = async (req, res) => {
    const errors = validationResult(req);
    console.log('before enter');
    if(!errors.isEmpty()){
        return res.status(422).json({message: 'Validation failed.', error : errors.array()});
    }
    const formData = req.body;
    console.log(formData)

    formData.requestImage = await imageUpload(formData.requestImage);

    const newRequest = new Request(formData); 
            newRequest.save() 
                    .then(request => {
                        res.status(201).json({
                            message: "Request created successfully",
                            request: request
                        })
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error creating request",
                            error: err
                        })
                    })
            }
        
module.exports = { createRequest };