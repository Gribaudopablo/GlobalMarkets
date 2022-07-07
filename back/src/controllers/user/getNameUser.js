const userSchema = require('../../models/user');

const getNameUser = async (req, res) => {
    const name = req.params.name;
    try {
        const user = await userSchema.find({ name: name });
        res.json(user);
    } catch (error) {
        console.log(error, 'error');
    }
}
module.exports = getNameUser;