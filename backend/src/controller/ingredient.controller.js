import Ingredient from "../models/ingredient.model"
import errorHandler from "../helpers/dbErrorHandler"

const list = (req, res) => {
    Ingredient.find((err, ingredient) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
        res.json(ingredient);
    });
}
export default { list }