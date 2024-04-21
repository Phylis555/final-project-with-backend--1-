const { imageUpload } = require("../../common/imageUpload");
const { sendEmail } = require("../../common/sendEmail");
const { validationResult } = require('express-validator/check');
const Donation = require("../../models/donation.model");
const Item = require("../../models/item.model");



const createDonation = async (req, res) => {
  try {
    let donationImage;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({message: 'Validation failed.', error : errors.array()});
    }
    // const emailArray = [
    //   "akilakavinda909@gmail.com",
    //   "akilakavinda909@gmail.com",
    //   "akilakavinda909@gmail.com",
    //   "akilakavinda909@gmail.com",
    // ];
    const donationData = req.body;
    // console.log(donationData.donationImage);
    if (donationData.donationImage != null) {
      const imageBase64 = donationData.donationImage;
      donationImage = await imageUpload(imageBase64);
    }
    // const imageBase64 = donationData.donationImage;
    // const donationImage = await imageUpload(imageBase64);

    // var imageUploaded = await imageUpload(imageBase64);
    // console.log(imageUploaded);
    const {
      userID,
      donationTitle,
      email,
      location,
      contactNumber,
      donationDescription,
      donationEndDate,
      wantedItems
    } = req.body;

    console.log(wantedItems);
    let databaseItems = [];
    // await wantedItems.forEach(async (item) => {
    //   try{
    //   let foundItem = await Item.findOne({ 'itemCategory': item.category, 'itemName' : item.itemName}, 'name occupation');
    //   if(!foundItem){
    //     const newDBItem = new Item({itemCategory : item.category, itemName : item.itemName});
    //     await newDBItem.save();
    //     foundItem = newDBItem;
    //   }
    //   databaseItems.push({item: foundItem, wantedQuantity: item.quantity });
    //   }
    //   catch(error)
    //   {
    //     console.log(error);
    //   }
    // });
    if(wantedItems.length == 0)
      throw new Error("Can't create donation without items");

    await Promise.all(wantedItems.map(async (item) => {
      try {
        let foundItem = await Item.findOne({ 'itemCategory': item.category, 'itemName': item.itemName }, 'name occupation');
        if (!foundItem) {
          const newDBItem = new Item({ itemCategory: item.category, itemName: item.itemName });
          await newDBItem.save();
          foundItem = newDBItem;
        }
        databaseItems.push({ item: foundItem, wantedQuantity: item.quantity });
      } catch (error) {
        console.log(error);
      }
    }));

    const newDonation = await new Donation({
      userID,
      donationTitle,
      email,
      location,
      donationEndDate,
      contactNumber,
      donationImage: donationImage,
      donationDescription,
      wantedItems : databaseItems
    });

    await newDonation
      .save()
      .then((donation) => {
        // for (let index = 0; index < emailArray.length; index++) {
        //   sendEmail(emailArray[index], "loopTEst");
        // }
        sendEmail(email, donationTitle);
        console.log(donation);
        res.status(201).json({
          message: "Donation created successfully",
          donation: donation,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error creating donation",
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating donation",
      error: err,
    });
  }
};

module.exports = {
  createDonation,
};
