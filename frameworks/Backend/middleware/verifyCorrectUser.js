module.exports = (req, res, next) => {
  const userId =
    req.orginazationID ||
    req.userID ||
    req.params.id ||
    req.params.organizationID ||
    req.body.userID ||
    req.body.organizationID;

  if (!userId) {
    const error = new Error("No ID sent.");
    error.statusCode = 401;
    throw error;
  }

  if (userId !== req.userId) {
    const error = new Error("User is using another token");
    error.statusCode = 401;
    throw error;
  }

  next();
};
