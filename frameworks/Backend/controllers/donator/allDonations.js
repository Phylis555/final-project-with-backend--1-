const Donation = require("../../models/donation.model");

const getAllDonations = async (req, res) => {
  try {
    const currDon = await Donation.find({
      status: "active",
    }).populate("wantedItems.item");
    console.log(currDon[0].wantedItems);
    res.status(200).json(currDon);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Error fetching data",
      error: err,
    });
  }
};

module.exports = {
  getAllDonations,
};
