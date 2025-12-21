const express = require("express");
const { getAllMedicines } = require("../controllers/medicineController");

const router = express.Router();

router.get("/", getAllMedicines);

module.exports = router;
