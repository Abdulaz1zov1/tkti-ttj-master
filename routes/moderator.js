const express = require('express')
const router = express.Router()
const {UserCreate} = require('../controllers/moderator')
const {StudentAdd} = require('../controllers/student')
const isAuth = require('../middleware/isAuth')


router.post('/add', UserCreate.AddUser)
router.post('/login', UserCreate.login)
router.get('/all', isAuth, StudentAdd.userAll)
router.get('/:id', UserCreate.usergetById)




module.exports = router