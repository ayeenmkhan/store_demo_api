const Users = require('../../model/users');
const bcrypt = require('bcryptjs');
exports.registerUser = async (req, res, next) => {
    try {
        const { full_name, email_id } = req.body;
        console.log('input data', req.body);
        let fourDigitCode;
        fourDigitCode = 1000 + Math.floor(Math.random() * 9000);
        let cryptedPassword = await hashPassword(req.body.password);
        req.body.password = cryptedPassword;
        req.body.user_type = 1;
        const transaction = await Users.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        console.log("Server Error is ", error);
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}
async function hashPassword(userPassword) {

    const password = userPassword
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}