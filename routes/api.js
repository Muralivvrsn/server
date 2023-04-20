const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const mailer = require("../controllers/mailer")

router.post('/register',controller.register);
router.get('/login',controller.login);
router.get('/home',controller.home);
router.get('/jobs',controller.jobs)
router.post("/send-otp",mailer.sendOTP)


module.exports = router;