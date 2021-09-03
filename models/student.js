const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    file:{
        type: String,
        required: true
    },
    ism:{
        type: String,
        required: true
    },
    yonalishi:{
        type: String,
        required:true
    },
    nechikurs:{
        type: String,
        required: true
    },
    phone:{
        type:String,
        required:true,
        unique: true
    },
    Yotoqhona:{
        type: String,
        enum: ["Kam ta'minlangan oila farzandlari", "Boquvchisini yo'qotgan kop bolali oila a'zosi", "1 va 2-guruh nogironligi bo'lgan talaba", 
        "To'liq davlat ta'minotidagi (chin yetim)", "Oilasida 2 tadan ko'p to'lov kontrakt asosida o'qiydigan talaba",
        "\"Temir daftar\"ga tushgan oila farzandi","Oilasida 1 va 2-guruh nogironligi yoki surunkali kasallik bilan davolanadiganlari bo'lgan talaba",
         'Doimiy ish joyi yo\'q', 'no',"Tadbirlar va jamoat ishlarida faol talaba"],
        default:'no'
    }
})
module.exports = mongoose.model('Talaba', Schema);