const Student = require('../models/student')
// const user = new Student({
//     file: `none.png`,
//     ism: "Hamroyev Isomiddin",
//     yonalishi: "MENEJMENT VA KASB TA`LIMI FAKULTETI",
//     nechikurs: "3-bosqich",
//     phone: "+998907777777"
// })
// user.save()

exports.StudentAdd = {
    AddUser:async(req, res)=>{
        console.log(req.body)
        try{
            const user = new Student({
                file: `${req.file.filename}`,
                ism: req.body.ism,
                yonalishi: req.body.yonalishi,
                nechikurs: req.body.nechikurs,
                phone: req.body.phone,
                Yotoqhona: req.body.Yotoqhona
            })
           await user.save().then(() => {
            
            res.render('main', {
                msg: "Ma`lumotlar muvaffaqiyatli saqlandi!"
            })
        })
            // res.redirect('/admin/all')
        }catch(err){    
            console.error(err)
            // return res.status(500).json({msg: err.message})
            
                res.render('main',{
                    msg:"Ma'lumotlar noto'g'ri kiritildi!"
                })
             
        }
    },
    usergetById:async(req, res)=>{
        try{
            const user = await Student.findById({_id: req.params.id})
            res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    },delete:async(req, res)=>{
        try{
            const user = await Student.deleteOne({_id: req.params.id})
            res.redirect("/student/all")
            // res.json(user)
        }catch(err){
            return res.status(404).json({msg: err.message})
        }
    },
    userAll:async( req, res)=>{
        try{
            if(req.query.FilterByYotoqxona){ 
                const user = await Student.find({Yotoqhona:req.query.FilterByYotoqxona})
            .sort({date: -1})

            return res.render("adminPanel",{students:user,name:req.session.valijon?req.session.valijon.ism:"Admin"})
            }
            const user = await Student.find()
            .sort({date: -1})
            res.render("adminPanel",{students:user,name:req.session.valijon?req.session.valijon.ism:"Admin"})
        }catch(err){
            
            console.error(err)
            // return res.status(500).json({msg: err.message})
            
                res.render('main',{
                    msg:"Ma'lumotlar noto'g'ri kiritildi yoki mavjud telefon raqamdan foydalanildi!"
                })
        }
    }  
}
