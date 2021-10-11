import Address from "../models/address.model"
import errorHandler from "../helpers/dbErrorHandler"

const create = (req, res, next) => {
    const address = new Address(req.body);
    address.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.status(200).json({
            message: "Created address"
        })
    })
}

const list = (req, res) => {
    Address.find({ creator: req.params.user }, (err, address) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(address);
    })
}

const deleteOne = (req, res) => {
    Address.deleteOne({ _id: req.params.id }, (err, address) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(address);
    })
}

export default { create, list, deleteOne }