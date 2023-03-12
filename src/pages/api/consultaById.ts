import { consultaById } from "../../utils/LinkDAO"


export default async function handler(req, res){

    const user = {
        id: req.body.id
    }

    const response = await consultaById(user.id)

    res.status(200).json(response)

}
