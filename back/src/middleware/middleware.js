const jwt=require ('jwt-simple');
const moment =require('moment');
const nodemailer=require('nodemailer');






const checkToken =  async (req,res,next)=>{
     console.log(req.headers);   
     
    // if(!req.headers['usertoken']){
    //     return res.json({error :'se necesita token en la cabecera '});
    // };

    const userToken= req.headers['usertoken'];
    console.log(userToken)
    let payload={};
      if(userToken){
         payload= await jwt.decode(userToken,'clave secreta');
              
               
      }else{
        return  res.status(404).json({error:'token erroneo'});}
    

    if(payload.expiredAt < moment().unix()){
        return res.json({error :'el token ha vencido'})
    };



var transporter= nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
    secure:false,
    auth:{
        user:'danielperco4@gmail.com',
        pass:'ktwwtdtrwtzjpicn'
    }
});
console.log(payload)
var mailOptions={
    from :'"server Api"<danielperco4@gmail.com>',
    to : payload.email,
    subject:"server Api",
    text:'Buenos dias , Bienvenido a GLOBAL MARKETS, Vamos Bien '
};
console.log('hola');
await transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
             return res.status(500).json(error.message);
        }else{
  
            console.log('emial enviado',info.response);
          // return  res.status(200).jsonp(req.body);
        }

    })  
    
    //catch(error){return res.status(404).json({error:'el acceso no es correcto'})}

    req.email=payload.email;
    next();

}

module.exports={
    checkToken:checkToken
}