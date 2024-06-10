const User = require("../../models/requester.model");
const Donation = require("../../models/donation.model");
const Request = require("../../models/donationRequest.model");

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    console.log(id);
    const donations = await Donation.find({ userID: id }).exec();
    // console.log(donations);

    await Promise.all(
      donations.map(async (singleDon) => {
        await Request.deleteMany({ donationID: singleDon._id });
      })
    );

    await Donation.deleteMany({ userID: id });
    res.status(200).send({ message: "User Deleted" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = {
  deleteUser,
};
