const express = require('express');
const router  = express.Router();
const {sendPasswordResetEmail}= require('../controllers/passwordReset.controller');

router.post('/forgot-password', sendPasswordResetEmail);

module.exports = router;