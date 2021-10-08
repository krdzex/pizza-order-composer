import Dough from "../models/Dough.model"
import errorHandler from "../helpers/dbErrorHandler"

const list = (req, res) => {
    Dough.find((err, doughs) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(doughs);
    });
}
export default { list }