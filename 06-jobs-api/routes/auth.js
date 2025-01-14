const express = require('express');;
const router = express.Router();

const {login, regester} = require('../controllers/auth');

router.route('/register').post(regester);
router.route('/login').post(login);

module.exports = router;