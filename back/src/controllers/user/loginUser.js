
const { Router } = require('express');

const bcrypt= require('bcrypt');
const moment=require('moment');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/user');
const alert =require('alert')


const loginUser=async (req,res)=>{ 
//    console.log(req.body);
    let Username=req.body.Username;
    let email=req.body.email;
    let password=req.body.password; 
//     console.log(email,password,Username);
    let user = await userSchema.findOne({email:email});

    if(!user){
        return res.status(400).json({message:"Correo o Password no validos"}) 
    }


//     if(!bcrypt.compareSync(password,user.password)){
//        alert("Password Incorrecta")
//        res.status(400);
//     }
    //const igual=bcrypt.compareSync(password,user.password);

    console.log(user) 
    let role = user.role;

    let mailencontraddo= await userSchema.findOne({email : email});
    let usernameexiste= await userSchema.findOne({Username:Username});
    let passwexiste=await userSchema.findOne({password:password});
    if(mailencontraddo){ 
            console.log('email correcto ')
            // console.log(igual);
             
             //passwexiste=true;
               if(usernameexiste){
                       console.log('Username correto')
                            if( passwexiste){   
                                                
                                
                                     res.status(200).json({
                                        token: createToken(user),
                                        user:{
                                                email,role,Username
                                        }


                                });


                                     alert('Usuario Registrado');
                                     

                            }else{
                                    alert('la password  no es correcta ') ;
                                    return false;
                            }
               }else{
                  alert('El Username no existe  ') ;
                  return false;
               }
        
        
      }else{
            alert('el email no existe ');
            return false;
      };
 


            
         function createToken (user){   //creo el token
             const token =  jwt.sign(
                      {
                        Username:user.Username.toString(),
                        email:user.email.toString()        
                      },
                      'clave secreta',
                      {expiresIn:'30d'}
                )
                return token

         };
         
         


}






module.exports = loginUser;