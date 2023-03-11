import {editarById} from "../../utils/linkDAO"

export default async function handler(req, res){

    const user = {
        customer: req.body.customer,
        id: req.body.id
    }

    const response = await editarById(user.id, user.customer)

    res.status(200).json(response)

}
