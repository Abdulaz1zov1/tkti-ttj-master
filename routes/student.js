const express = require('express')
const router = express.Router()
const {StudentAdd} = require('../controllers/student')
const md5 = require('md5')
const multer = require('multer')
const path = require('path')
const isAuth = require('../middleware/isAuth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/upload')
    },
    filename: function(req, file, cb){
        cb(null, `${md5(Date.now())}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})


router.post('/add', upload.single("file"), StudentAdd.AddUser)
router.get('/all',isAuth, StudentAdd.userAll)
router.get('/del/:id', StudentAdd.delete)
router.get('/:id', StudentAdd.usergetById)





module.exports = router