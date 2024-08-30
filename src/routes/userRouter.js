const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const { user } = require('../database');

router.post('/',userController.createUser);
router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserWithId);
router.delete('/:id',userController.deleteUser);
router.put('/:id',userController.editUser);

module.exports=router;
