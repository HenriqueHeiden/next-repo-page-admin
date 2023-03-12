import {consulta} from "../../utils/linkDAO"

export default async function handler(req, res){
    const dados = {
        email: req.body.email
    }

    const response = await consulta(dados.email)

    res.status(200).json(response)

}
