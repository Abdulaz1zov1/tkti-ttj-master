const mongoose=require('mongoose')
const MongoURI = "mongodb://localhost:27017/tkti"
// const MongoURI = "mongodb+srv://Rtest:o27012001@cluster0.se58s.gcp.mongodb.net/ejs-ulash?retryWrites=true&w=majority"


const db=MongoURI
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('Connected mongodb...')
})
.catch((err)=>{
    console.error(err);
})

mongoose.set('useFindAndModify',false)