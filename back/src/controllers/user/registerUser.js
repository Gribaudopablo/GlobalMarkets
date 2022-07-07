const userSchema = require('../../models/user'); 
const user = require('../../models/user');
const jwt=require ('jwt-simple');
const moment =require('moment');
const nodemailer=require('nodemailer');
const bcrypt =require('bcrypt')
const alert=require('alert');
//const userSchema = require('../../models/user'); 

const respon = async (req,res,next) =>{
  

console.log(req.body);
let password=req.body.password;
let  name=req.body.name;
let surname=req.body.surname;
let email=req.body.email;
let Username=req.body.Username;
let dni=req.body.dni;
let age=req.body.age;
let address=req.body.address;
let phoneNumber=req.body.phoneNumber;
let role = "client"
 
let mailencontraddo= await userSchema.findOne({email : email});
let usernameexiste= await userSchema.findOne({Username:Username});
let dniexiste=await userSchema.findOne({dni:req.body.dni});
     
    if(!mailencontraddo){
        console.log('no exsite el mail en la base') 
         if(!usernameexiste){
                 console.log('no exsite el Username en la base')
                   if(!dniexiste){
                           let user= userSchema({name,surname,email,Username,password,dni,age,address,phoneNumber,role});
                           await user.save();
                           console.log(user)
                           var transporter= nodemailer.createTransport({
                            host:"smtp.gmail.com",
                            port: 587,
                            secure:false,
                            auth:{
                                user:'danielperco4@gmail.com',
                                pass:'ttakmtneynhkwmjl'
                            }
                        });
                        console.log(req.body.email)
                        var mailOptions={
                            from :'server Api"<danielperco4@gmail.com>',
                            to : req.body.email,
                            subject:"server Api",
                            text:'Buenos dias , Bienvenido a GLOBAL MARKETS, Vamos Bien '
                        };
                        console.log('hola');
                        let post= await transporter.sendMail(mailOptions,(error,info)=>{
                            if(error){
                                  return   res.status(404).json(error.message);                                      
                              }else{                      
                               console.log('emial enviado',info);
                          
                               alert('Usuario Registrado Correctamente');
                            //    function redireccionar(){window.location="http://localhost:9000/users";}
                            //    setTimeout ("redireccionar()", 5000);
                            
                               req.email=req.body.email;
                               next();
                               
                             }  
   
                       })  
                    
                   
                await res.json('todo ok');
                   }else{
                     alert('el dni   ya esta registrado  ');
                     return false;
                   }
         }else{
            alert('el Username  ya esta registrado ,prueb con otro ');
            return false;
         }
    }else{
        alert('el email   ya esta registrado ,prueb con otro ');
    }
}

module.exports= respon ;