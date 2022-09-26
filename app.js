const path=require(`path`)
const ejsMate=require(`ejs-mate`)
const express=require(`express`);
const app=express();

app.engine("ejs",ejsMate);
app.set(`view engine`,"ejs")
app.set(`views`,path.join(__dirname,"views"))

app.use(express.json());

const MongoConnect=require("./db")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname,"/public")))

app.use(require("body-parser").json());

// app.get("",(req,res)=>{
//     res.render("sub_views/index.ejs")
// })
app.get("/",(req,res)=>{
    // res.sendFile(path.join(__dirname,"views/Index.html"))
    res.render("sub_views/HomePage.ejs")
    
})

app.get("/team",(req,res)=>{
    // res.sendFile(path.join(__dirname,"views/Team.html"))
    res.render("sub_views/Team.ejs")
})

app.get("/about",(req,res)=>{
    res.render("sub_views/About.ejs")
})
app.get("/events",(req,res)=>{
    res.render("sub_views/Events.ejs")
})

// app.get("/event",(req,res)=>{
//     res.sendFile(path.join(__dirname,"views/Events.html"))
// })

// app.get("/contact",(req,res)=>{
//     res.sendFile(path.join(__dirname,"views/Contact.html"))
// })

app.post("/encrypted_info_contact_us",(req,res)=>{
   
    let {name,phone_number,email,message}=req.body;
    phone_number=parseInt(phone_number)
    console.log(name,phone_number,email,message)
    new MongoConnect("Contact Us",name,phone_number,email,message);   

})

app.post("/encrypted_info_newsletter",(req,res)=>{
    
    let {newsletter}=req.body;
    newsletter=newsletter.toLowerCase();

    
        (function(){
            action=new MongoConnect("Newsletter","","","","",newsletter)
            delete action;
    
        })()

})
app.all("*",(req,res)=>{
    res.redirect("/")
})


let port =process.env.PORT || 3000
app.listen(port)