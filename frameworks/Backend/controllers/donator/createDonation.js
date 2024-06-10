const { imageUpload } = require("../../common/imageUpload");
const { sendEmail } = require("../../common/sendEmail");
const { validationResult } = require("express-validator/check");
const Donation = require("../../models/donation.model");
const Item = require("../../models/item.model");

const createDonation = async (req, res, next) => {
  try {
    let donationImage;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.status = 422;
      throw error;
    }

    const donationData = req.body;
    if (donationData.donationImage != null) {
      const imageBase64 = donationData.donationImage;
      donationImage = await imageUpload(imageBase64);
    }

    const {
      userID,
      donationTitle,
      email,
      location,
      contactNumber,
      donationDescription,
      donationEndDate,
      wantedItems,
    } = req.body;

    console.log(wantedItems);
    let databaseItems = [];

    if (wantedItems.length == 0) {
      const error = new Error("Can't create donation without items");
      error.status = 400;
      throw error;
    }
    await Promise.all(
      wantedItems.map(async (item) => {
        try {
          let foundItem = await Item.findOne(
            { itemCategory: item.category, itemName: item.itemName },
            "name occupation"
          );
          if (!foundItem) {
            const newDBItem = new Item({
              itemCategory: item.category,
              itemName: item.itemName,
            });
            await newDBItem.save();
            foundItem = newDBItem;
          }
          databaseItems.push({
            item: foundItem,
            wantedQuantity: item.quantity,
          });
        } catch (error) {
          console.log(error);
        }
      })
    );

    const newDonation = await new Donation({
      userID,
      donationTitle,
      email,
      location,
      donationEndDate,
      contactNumber,
      donationImage: donationImage,
      donationDescription,
      wantedItems: databaseItems,
    });

    const donation = await newDonation.save();
    console.log(donation);
    res.status(201).json({
      message: "Donation created successfully",
      donation: donation,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  createDonation,
};
