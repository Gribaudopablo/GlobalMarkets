const { Router } = require('express');

const bcrypt= require('bcrypt');
const moment=require('moment');
const jwt = require('jsonwebtoken');
const userSchema = require('../../models/user');
const alert =require('alert');


function createToken (user){   //creo el token
    console.log("estoy en createToken");
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


// const validateToken =  async (req,res)=>{ 
//     const token = req.headers;
//     // console.log(token);

//     let userEmail = '';

//     try {
//         userEmail = await isValidToken(token);
//     } catch (error) {
//         return res.status(401).json({
//             message:'Token de autorizacion no es valido'
//         })
//     }

//     let user = await userSchema.findOne(userEmail);
//     if(!user){
//         return res.status(400).json({
//             message:'No existe usuario con ese email'
//         })
//     }

//     console.log(user)
//     return res.status(250).json({
//         token: createToken(user),
//         user:{
//             email,role,Username
//         }
//     })
    

// }

const validateToken = async function(req, res) {
    const token = req.cookies.token
    if (!token) {
      res.status(401).send({
        ok: false,
        message: 'no se verifico'
      })
    };
   const decode = jwt.verify(token,'clave secreta')
      console.log("estoy decode:", decode)
  //  console.log(decode);
   const email = decode.email 
   let user = await userSchema.findOne({email:email});
  //console.log(user)
  if(!user) return res.status(400).json({message: "no user found"})
  // console.log(user)
  let role = user.role;
  let Username = user.Username
  return res.status(200).json({
             token: createToken(user),
             user:{
                 email,role,Username
             }
         })

 
 }





module.exports = validateToken;
