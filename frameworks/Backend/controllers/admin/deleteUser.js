const User = require("../../models/requester.model")

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try{
        await User.findByIdAndDelete(id);
        res.status(200).send({ message: "User Deleted"  });
    } catch(err){
        res.status(500).send({ message: "Error deleting user", err });
    }
};

module.exports = {
  deleteUser,
};
