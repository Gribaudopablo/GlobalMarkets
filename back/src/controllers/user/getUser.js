const userSchema = require('../../models/user');

const getUsers = (req, res) => {
    console.log('El usuario logeado es =',req.email);
    userSchema.find()

        .then((data) => {
            res.json(data)//responde con los datos de todos los user   
        })
        .catch((err) => {
            res.json({ message: err });
        });
}

  
module.exports = getUsers;