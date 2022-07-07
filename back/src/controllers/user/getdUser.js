const userSchema = require('../../models/user');

const getdUser = (req, res) => {
    const { dni } = req.params;
    //console.log(req.params)
    userSchema.findOne({_dni : dni})
      
        .then((data) => {
            
            res.json(data);//responde con los datos del usuario creado     
        })
        .catch((err) => {
            res.json({ message: err });
        });
}

module.exports = getdUser;