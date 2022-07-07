const userSchema = require('../../models/user');

const updateUser = (req, res) => {
    const { dni } = req.params;
    const { name, age, email } = req.body;
    userSchema.updateOne({ dni: dni }, { $set: { name, age, email } })

        .then((data) => {
            res.json(data);//responde con los datos del usuario creado     
        })
        .catch((err) => {
            res.json({ message: err });
        });
}


module.exports = updateUser;