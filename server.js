const express=require("express")
const app=express()
const mongoose=require("mongoose")
const urlschema=require('./models/schema')
const shortid=require("shortid")
const shorturlgenerated=shortid.generate()

mongoose.connect('mongodb+srv://admin:admin@cluster0.35fn6ak.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true, useUnifiedTopology:true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async (req,res) => {
    const datas=await urlschema.find()
    res.render('index',{input: datas})
})

app.post('/shorturl',async (req,res) =>{
    const shorturl= await urlschema.find()
    //console.log(shorturl)
    const array=shorturl.map(obj=>obj.short)
    while(array.includes(shorturlgenerated)){
        shorturlgenerated=shortid.generate()
    }
    await urlschema.create({full: req.body.url, short: shorturlgenerated})
    res.redirect('/')
})
app.get('/:id', async (req,res)=>{
    const id=req.params.id
    const link=await urlschema.findOne({short:id})
    res.redirect(link.full)
})

app.listen(2000)