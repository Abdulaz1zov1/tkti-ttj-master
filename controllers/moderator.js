const Moderator = require('../models/user')

exports.UserCreate = {
    AddUser:async(req, res)=>{
        try{
            const user = new Moderator(req.body)
            res.json(user)
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },
    login:async(req, res)=>{
        try{
                const { email, password } = req.body;
              
                // Parolni solishtirish
                if (!email || !password) {
                    res.redirect('/')
                }
                const users = await Moderator.findOne({ email: email }).select('password');
                if (!users) {
                    res.redirect('/')
                }
                console.log(users)
                const isMatch = await users.matchPassword(password);
                if (!isMatch) {
                    res.redirect('/');
                }
              
                // Avtorizatsiyadan o'tgan paytda sessiya paydo boladi, ungacha ko'rinmaydi
                const body = await Moderator.findOne({ email: req.body.email })
                console.log(body)
                req.session.valijon = body
                req.session.save()
                
                console.log(req.session)
              
              
                req.session.isAuth = true
                res.redirect('/api/all')

        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    },
    usergetById:async(req, res)=>{
        try{
            const user = await Moderator.findById({_id: req.params.id})
            res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    },
    userAll:async( req, res)=>{
        try{
            const user = await Moderator.find()
            .sort({date: -1})
            res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    }
}