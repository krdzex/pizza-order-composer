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

const list = (req, res) => {
    Order.find({ creator: req.params.user}, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(order);
    })
}

export default { create, list }