const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");
const { User } = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  handleValidationErrors,
];

// Route handler for logging in
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    // Search the User DB with the provided credential + password
    const user = await User.login({ credential, password });

    // If user with the credential and password does not exist, invoke the next
    // error handling middleware
    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "logout success" });
});

router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

module.exports = router;
