const express = require('express');
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/balance', authMiddleware, accountController.getBalance);

module.exports = router;
