const { Console } = require("console");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const userSchema = require("../../models/user");

const createUsuario = (req, res) => {
  res.render("registro");
  //console.log(req.body);
  // const errors= validationResult(req);
  // console.log(errors);
  // console.log(formData);
  //let  {name,surname,email,password,dni,age,address,Username,phoneNumber}=req.body;
  //  let name=req.body.name;
  //  let surname=req.body.surname;
  //  let email=req.body.email;
  //  let password=req.body.password;
  //  let dni=req.body.dni;
  //  let age=req.body.age;
  //  let address=req.body.address;
  //  let Username=req.body.Username;
  //  let phoneNumber=req.body.phoneNumber;
  // password= bcrypt.hashSync(password,10);
  //console.log(name);
  //let newuser= {name,surname,email,password,dni,age,address,Username,phoneNumber}
  //console.log(newuser)

  ////##############################################################################################
  // if(!errors.isEmpty()){
  //     return res.status(422).json({errores : errors.array()})
  // }
  // const user = userSchema({name,surname,email,password,dni,age,address,Username,phoneNumber});
  // console.log(user);   // se requiere  bcrypt , validators de express-validator,moment,                                  //jwt-simp
  // user.save()
  //     .then((data) => {
  //         //console.log(data);
  //         res.json(data);            //responde con los datos del usuario creado
  //     })
  //     .catch((err) => {
  //         res.json({ message: err });
  //     });
};

module.exports = createUsuario;
