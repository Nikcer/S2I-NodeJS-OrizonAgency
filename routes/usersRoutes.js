const express = require ('express')
const router = express.Router('router')
const userController = require ('../controllers/userController')

router.get('/', userController.userList);
router.get('/:id', userController.userById)
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser)

module.exports = router;