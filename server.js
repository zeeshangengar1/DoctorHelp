const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const ejs=require("ejs")
const mongoose=require("mongoose")
const spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://Zeeshan21:Atlas10@cluster0.c7d8kgp.mongodb.net/appointmentDB",{useNewUrlParser:true});


// appointment Schema

const appointSchema={
    name : String,
    age:Number,
    mobile : Number,
    email : String,
    description : String,
    date : Date,
    clinic:String,
    approved : Boolean
}

// user Schema 

const userSchema={
    clinicName:String,
    password:String
}

const Appointment=mongoose.model("Appointment",appointSchema);
const User=mongoose.model("User",userSchema);

const m={"Paroymsal Positional Vertigo" : "Physiotherapist",
"AIDS": "Infectious Disease Doctor",
"Acne" : "Dermatologist",
"Alcoholic hepatitis":"Hepatologist",
"Allergy": "Allergist",
"Arthritis":"rheumatologist",
"Bronchial Asthma":"Pulmonologist",
"Cervical spondylosis":"Orthopedist",
"Chicken pox": "Infectitious Doctor",
"Chronic cholestasis":"Gastroenterology", 
"Common Cold":"Physician",
"Dengue":"Infectitious Doctor",
"Diabetes":"endocrinologist",
"Dimorphic hemmorhoids(piles)":"General Physician",
"Drug Reaction":"Allergist",
"Fungal infection": "Dermatologist",
"GERD":"Gastroenterologist",
"Gastroenteritis":"Gastroenterologist",
"Heart attack":"Cardiologist",
"Hepatitis B":"Hepatologist",
"Hepatitis E":"Hepatologist",
"Hypertension":"Nephrologist",
"Hyperthyroidism":"Endocrinologist",
"Hypoglycemia":"Endrocrinologist",
"Impetigo":"Dermatologist",
"Jaundice": "Gastroenterologist",
"Malaria":"General Physician",
"Migraine":"Neurologist",
"Osteoarthristis":"Rheumatologist",
"Paralysis" :"Neurologist",
"Peptic ulcer diseae":"Gastroenterologist",
"Pneumonia":"Pulmonologist",
"Psoriasis":"Rheumatologist",
"Tuberculosis":"Pulmonologist",
"Typhoid":"Infectitious Disease Doctor",
"Urinary tract infection":"Gynecologist",
"Varicose veins":"Dermatologist",
"hepatitis A":"Gastroenterologist"}


app.get('/',function(req,res)
{
    res.render('home')
})

// app.get("/foot",function(req,res){
//     res.render("partials/footer.ejs")
// })
app.get('/book-appointment',function(req,res)
{

    User.find({},function(err,result){
        result.forEach(function(i){
            console.log(i.clinicName);
        })
        res.render('bookAppointment',{clinics:result});
    })
})

app.get('/manage-appointment',function(req,res)
{
    res.redirect("/login")
})

app.post('/unAcceptedReq',function(req,res)
{
   User.find({clinicName:req.body.userName,password:req.body.password},function(err,res1)
   {
    if(err)
    {
        console.log(err);
        res.redirect("/login")
    }
    else
    {
   
        Appointment.find({approved:false,clinic:req.body.userName},function(err,result){
            res.render('unAcceptedRequest',{res:result});
        })
    }
   })
})

app.post('/acceptedReq',function(req,res)
{


    User.find({clinicName:req.body.userName,password:req.body.password},function(err,res1)
    {
     if(err)
     {
         console.log(err);
         res.redirect("/login")
     }
     else
     {
         Appointment.find({approved:true,clinic:req.body.userName},function(err,result){
             res.render('acceptedRequest',{res:result});
         })
     }
    })
})

app.get('/login',function(req,res)
{
    res.render('login')
})

app.get('/register',function(req,res)
{
    res.render('register')
})

app.post('/reg',function(req,res)
{
    username=req.body.userName;
    passw=req.body.password;
    const user=new User({
        clinicName:username,
        password:passw
        })
        user.save();
        res.redirect("/");
})

app.post('/make-appointment',function(req,res)
{
    fName=req.body.name;
    age=req.body.age;
    email=req.body.email;
    mobile=req.body.mobile;
    clinic=req.body.select_doctor;
    mobile=req.body.mobile;
    description=req.body.description;
    // select_doctor=req.body.select_doctor;
    // console.log(fName,lName)
    console.log(email,mobile)
    console.log(description, clinic)
    const ap=new Appointment({
        name : fName,
        age:age,
        mobile : mobile,
        email : email,
        clinic:clinic,
        description : description,
        date : Date.now(),
        approved : false
    })
    ap.save();
    res.render('madeAppointment',{e:fName})
})

app.post('/pendingDec',function(req,res)
{
    id=req.body.sub;
    date=req.body.date;
    date1=new Date(date)
    console.log(id,date1);
    Appointment.findByIdAndUpdate(id,{approved:true,date:date1},function(err,docs)
    {
        if(err) console.log(err)
        else res.redirect("/manage-appointment")
    })
    
})

app.post('/predict-result',function(req,res)
{
    fName=req.body.fname;
    lName=req.body.lname;
    email=req.body.email;
    mobile=req.body.mobile;
    symptoms=req.body.request;
    var process=spawn('python',["Prediction/app.py",symptoms]);
    process.stdout.on('data',(data)=>
    {
        l=data.toString()
        l=l.slice(0,l.length-1)
        k=m[l]
        res.render('predictResult',{name:fName+" "+lName,res:l,doc:k})
       
    })

})


app.get('/predict-disease',function(req,res)
{
    res.render('predict')
})

app.get('/find-doctor',function(req,res)
{
    res.render('doctor')
})


app.get('/symptomList',function(req,res)
{
    res.render('symptomList')
})

let port=process.env.PORT;
if(port=="" || port==null){
    port=3000;
}

app.listen(port,function(){
    console.log("Server Running Up")
})
