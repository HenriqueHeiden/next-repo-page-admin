import { editar } from "../../utils/linkDAO"

export default async function handler(req, res){

    const user = {
        email: req.body.email,
        customer: req.body.customer
    }

    const response = await editar(user.email, user.customer)

    res.status(200).json(response)

}
