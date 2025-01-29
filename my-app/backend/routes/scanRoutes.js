const express = require('express');
const { processScan } = require('../controllers/scanController');

const router = express.Router();

// Process Body Scan Data
router.post('/', processScan);

module.exports = router;
