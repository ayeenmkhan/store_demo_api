const Product = require('../../model/product');

exports.addProduct = async (req, res, next) => {
    try {
        const transaction = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        if (req.headers.user_type == 0) {
            const transaction = await Product.updateOne({ "_id": req.body.product_id }, req.body);

            return res.status(201).json({
                success: true,
                data: "Prodcut Updated Successfuly"
            })
        } else {
            return res.status(303).json({
                success: false,
                code: 303,
                error: 'User Not Authorized to do this Action'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.getProduct = async (req, res, next) => {
    try {
        const transaction = await Product.find();
        if (!transaction) {
            return res.status(404).json({
                success: false,
                code: 404,
                error: "Not Found"
            })
        } else {
            return res.status(201).json({
                success: true,
                data: transaction
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        if (req.headers.user_type == 0) {
            const transaction = await Product.findById(req.params.id);
            if (!transaction) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    error: 'No data found'
                })
            } else {
                await transaction.remove();
                return res.status(200).json({
                    success: true,
                    message: 'Successfuly delete the Product'
                })
            }
        } else {
            return res.status(303).json({
                success: false,
                code: 303,
                error: 'User Not Authorized to do this Action'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            code: 500,
            error: 'Server Error'
        })
    }
}