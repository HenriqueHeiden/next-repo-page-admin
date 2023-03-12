import {editarById} from "../../utils/LinkDAO"

export default async function handler(req, res){

    const user = {
        customer: req.body.customer,
        id: req.body.id,
        email: req.body.email
    }

    const response = await editarById(user.id, user.email, user.customer)

    res.status(200).json(response)

}
