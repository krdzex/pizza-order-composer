import Order from "../models/order.model"
import errorHandler from "../helpers/dbErrorHandler"

    const create = (req, res, next) => {
        const order = new Order(req.body);
        order.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler.getErrorMessage(err)
                })
            }
            res.status(200).json({
                message: "Created order"
            })
        })
}

export default {create}