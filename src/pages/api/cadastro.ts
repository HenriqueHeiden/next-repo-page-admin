import {cadastro} from "../../utils/linkDAO"

export default async function handler(req, res){

    const user = {
        email: req.body.email,
        title:req.body.title,
         link: req.body.link,
         tipoLink: req.body.tipoLink
    }

    const response = await cadastro(user.email, user.title, user.link, user.tipoLink)

    res.status(200).json(response)

}
