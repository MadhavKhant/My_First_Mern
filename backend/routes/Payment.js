const express = require("express");
const router = express.Router();

const {CapturePayment, VerifySignature} = require("../controllers/Payments");
const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

router.post("/CapturePayment", auth, isStudent, CapturePayment);
router.post("/VerifySignature", VerifySignature);

module.exports = {PaymentRoute: router};