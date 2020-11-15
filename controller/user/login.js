const userLogin = require('../../model/users');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
exports.userLogin = async (req, res, next) => {
    try {
        const transaction = await userLogin.findOne({"username": req.body.username });
       
        if (!transaction) {
            return res.status(404).json({
                success: false,
                code:404,
                error: 'User data not found'
            })
        } else {
            bcrypt.compare(req.body.password, transaction.password, function (err, result) {
                if (result) {
                    let token = createUserToken(transaction.email_id, transaction._id);
                    let response = {
                        "id": transaction.id,
                        "username": transaction.username,
                        "full_name": transaction.full_name,
                        "email": transaction.email_id,
                        "phone_no": transaction.phone_no,
                        "token": token
                    }

                    return res.status(200).json({
                        success: true,
                        data: response
                    })
                } else {
                    return res.status(201).json({
                        success: false,
                        code:201,
                        error: 'Username or password Incorrect'
                    })
                }
            });
        }
       
      
    } catch (error) {
        return res.status(500).json({
            success: false,
            code:500,
            error: 'Server Error'
        })
    }
}



let createUserToken = (email, id) => {
console.log(email);
    return jwt.sign({
        email: email,
        id: id
    },
        process.env.SECRET_KEY, {
        expiresIn: '21h'
    });

}