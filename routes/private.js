const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/private");
const { protect } = require("../middleware/auth");

//This is our main route that will be sent if the user isnt logged in

router.route("/").get(protect, getPrivateData);

module.exports = router;
