import {consulta} from "../../utils/linkDAO"

export default async function handler(req, res){

    const user = {
        email: req.body.email
    }

    const response = await consulta(user.email)

    res.status(200).json(response)

}
