const path = require('path');

const express = require('express');

const userController = require('../controllers/signup');
const expenseController = require('../controllers/addexpense');
const authenticatemiddleware = require('../middleware/auth');


const router = express.Router();

router.post('/signup', userController.AddUser);
router.get('/getusers/:useremail', userController.getuser);
router.post('/login', userController.checkuser);

router.get('/download',authenticatemiddleware.authenticate, expenseController.downloadExpenses);


module.exports = router;
