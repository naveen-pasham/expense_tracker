const path = require('path');

const express = require('express');
const userauthentication = require('../middleware/auth');


const expenseController = require('../controllers/addexpense');

const router = express.Router();

router.post('/addexpense',userauthentication.authenticate, expenseController.AddExpense);
router.get('/getexpenses', userauthentication.authenticate , expenseController.getexpenses);
router.get('/deleteexpense/:expenseId',userauthentication.authenticate , expenseController.deleteexpense);


module.exports = router;
