
const  crateUsermsje= async(req,res)=>{

    req.flash('success_msg','User Creado');
    res.redirect('/users');

       
}


module.exports={ crateUsermsje}