const User = require('../models/user')
const k=(new User({
    ism: "Admin",
    phone: "998931112233",
    password: "ttjAC2021",
    email: "adminttj@gmail.com"
}));
k.save()
.then(e=>{})
.catch(err=>{})
exports.UserCreate = {
    AddUser:async(req, res)=>{
        try{
            const user = new User({
                ism: req.body.ism,
                phone: req.body.phone,
                password: req.body.password,
                email: req.body.email
            })
            
            res.json(user)
        }catch(err){
            return res.status(400).json({msg: err.message})
        }
    },
    login:async(req, res)=>{console.log(1)
        try{
                // const { email, password } = req.body;
              
                // Parolni solishtirish
                // if (!email || !password) {
                //     res.redirect('/')
                // }
                // const users = await User.findOne({ email: email }).select('password');
                // if (!users) {
                //     res.redirect('/')
                // }
                // const isMatch = await users.matchPassword(password);
                // if (!isMatch) {
                //     res.redirect('/');
                // }
              
                // Avtorizatsiyadan o'tgan paytda sessiya paydo boladi, ungacha ko'rinmaydi
                const body = await User.findOne({ email: req.body.email,password:req.body.password })
               
                    if (!body) {
                        return res.render('login', {
                            msg: `Parol yoki email noto'g'ri kiritilgan`
                        })
                    }
                    console.log(body)

                req.session.valijon = body
                // req.session.save()
                
                
                
                req.session.isAuth = true
                // res.redirect('/admin/all')
                // res.render('adminPanel', {
                //     msg: ``
                // })
                    res.redirect("/student/all")
                
        }catch(err){
            return res.render('login', {
                msg: `Parol yoki email noto'g'ri kiritilgan`
            })
        }
    },
    usergetById:async(req, res)=>{
        try{
            const user = await User.findById({_id: req.params.id})
            res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    },
    userAll:async( req, res)=>{
        try{
            const user = await User.find()
            .sort({date: -1})
            res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    }  
}